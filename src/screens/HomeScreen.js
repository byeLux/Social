import { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../components/HomeHeader.js';
import Post from '../components/Post.js';
import Error from '../components/Error.js';
import PostForm from '../components/PostForm.js';
// import DetailsForm from '../components/DetailsForm.js';
// import Details from '../components/Details.js';
import Pagination from '../components/Pagination.js';
import { getPosts, createPost, updatePost, deletePost } from '../api/postService.js';
// import { getDetails, createDetails, updateDetails, deleteDetails } from '../api/detailsService.js';
import { getUser } from '../api/userService.js';
import { useErrorHandling } from '../hooks/useErrorHandling.js';
import { capitalize } from '../utils/stringUtils.js';

export default function HomeScreen({token, onLogout}) {

    const [posts, setPosts] = useState([]);
    //     const [details, setDetails] = useState([]);
    //     const [detailsTotalPages, setDetailsTotalPages] = useState(1);
    //     const [detailsPage, setDetailsPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [lastVisitedPage, setLastVisitedPage] = useState(1);

    const [userName, setUserName] = useState();

    const [userRole, setUserRole] = useState('');

    const { error, errorMessage, setError, setErrorMessage, withErrorHandling } = useErrorHandling(onLogout);

    // Helper per evitare di duplicare la validazione "post vuoto"
    function validateNotEmpty(text) {
        if (text.trim().length > 0) return true;
        setError(true);
        setErrorMessage("Il post non può essere vuoto!");
        return false;
    }

    async function loadPosts(pages) {
        const result = await withErrorHandling(() => getPosts(pages, token), 'load');
        if (!result) return;
        setPosts(result.posts);
        setTotalPages(result.pagination.total_pages);
    }

    async function loadUser(token) {
        const result = await withErrorHandling(() => getUser(token), 'user');
        if (!result) return;
        setUserRole(result.role);
        setUserName(result.username);
    }

    async function handlePublish(text) {
        if (!validateNotEmpty(text)) return;

        const result = await withErrorHandling(() => createPost(text, token), 'create');
        if (!result) return;

        await loadPosts(1);
        setLastVisitedPage(1);
    }

    async function handleEdit(id, editedContent) {
        if (!validateNotEmpty(editedContent)) return;

        const result = await withErrorHandling(() => updatePost(id, editedContent, token), 'update');
        if (!result) return;

        await loadPosts(lastVisitedPage);
    }

    async function handleDelete(id) {
        const result = await withErrorHandling(() => deletePost(id, token), 'delete');
        if (!result) return;

        await loadPosts(lastVisitedPage);
    }

    /*
    function validateDetails(values) {
        if (values.firstName.trim() && values.lastName.trim() && values.username.trim() && values.email.trim()) return true;
        setError(true);
        setErrorMessage('Compila tutti i campi dei dettagli.');
        return false;
    }

    async function loadDetails(page) {
        const result = await withErrorHandling(() => getDetails(page, token), 'loadDetails');
        if (!result) return false;

        setDetails(result.details);
        setDetailsTotalPages(result.pagination.total_pages);
        return true;
    }

    async function handleCreateDetails(values) {
        if (!validateDetails(values)) return false;

        const result = await withErrorHandling(() => createDetails(values, token), 'createDetails');
        if (!result) return false;

        await loadDetails(1);
        setDetailsPage(1);
        return true;
    }

    async function handleEditDetails(id, editedDetails) {
        if (!validateDetails(editedDetails)) return false;

        const result = await withErrorHandling(() => updateDetails(id, editedDetails, token), 'updateDetails');
        if (!result) return false;

        return await loadDetails(detailsPage);
    }

    async function handleDeleteDetails(id) {
        const result = await withErrorHandling(() => deleteDetails(id, token), 'deleteDetails');
        if (!result) return;

        let page = detailsPage;
        if (details.length === 1 && page > 1) {
            page = page - 1;
        }
        await loadDetails(page);
        setDetailsPage(page);
    }
    */

    useEffect(() => {
        const fetchData = async () => {
            await loadUser(token);
            await loadPosts(1);
            // await loadDetails(1);
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <HomeHeader 
                withErrorHandling={withErrorHandling}
                onLogout={onLogout}
                token={token}
                userName={capitalize(userName)}
            />
            {error ? (
                    <View>
                        <PostForm publish={handlePublish}/>
                        <Error error={errorMessage} />
                    </View>
                ) : (
                     <View>
                        <PostForm publish={handlePublish}/>
                    </View>
                )
            }
            {/*
            <DetailsForm onSave={(values) => handleCreateDetails(values)} />
            <FlatList
                data={details}
                renderItem={({ item }) => (
                    <Details
                        {...item}
                        viewerRole={userRole}
                        itsMe={item.authorUsername === userName}
                        onEdit={(id, values) => handleEditDetails(id, values)}
                        onDelete={(id) => handleDeleteDetails(id)}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
            />
            <Pagination
                totalPages={detailsTotalPages}
                setLastVisitedPage={setDetailsPage}
                loadPosts={loadDetails}
                loadUser={loadUser}
                token={token}
                currentPage={detailsPage}
            />
            */}
            <FlatList
                data={posts}
                renderItem={({ item }) => 
                    <Post {...item} 
                        itsMe={item.username === userName} 
                        canDelete={userRole === 'admin'} 
                        canEdit={ userRole === 'admin' || userRole === 'mod' } 
                        onDelete={handleDelete} onEdit={handleEdit}/>}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
            />
            <Pagination 
                totalPages={totalPages} 
                setLastVisitedPage={setLastVisitedPage} 
                loadPosts={loadPosts}
                loadUser={loadUser} 
                token={token}
                currentPage={lastVisitedPage}
            /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#202020',
    },
});
