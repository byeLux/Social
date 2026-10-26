export const ERROR_MESSAGES = {
    load:   { 
        response: 'Posts failed to load.\nPlease check your connection.',    
        unknown: 'An error occurred while loading the posts.\nPlease try again later.' 
    },
    update: { 
        response: 'Post failed to update.\nPlease check your connection.',   
        unknown: 'An error occurred while updating the post.\nPlease try again later.' 
    },
    delete: { 
        response: 'Post failed to delete.\nPlease check your connection.',   
        unknown: 'An error occurred while deleting the post.\nPlease try again later.' 
    },
    create: { 
        response: 'Post creation failed.\nPlease check your connection.',    
        unknown: 'An error occurred while creating the post.\nPlease try again later.' 
    },
    user:   { 
        response: 'User failed to load.\nPlease check your connection.',    
        unknown: 'An error occurred while loading the user.\nPlease try again later.' 
    },
};

export const NETWORK_ERROR_MESSAGE = 'Network error.\nServer might be unreachable.';