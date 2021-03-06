import FD from 'form-data';
import { userService } from '../services/userAuth';
import profileConst from '../constants/profileConst';

function getProfile() {
  return dispatch => {
    dispatch(request());
    userService.getProfile().then(
      res => {
        dispatch(success(res.data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: profileConst.PROFILE_REQUEST };
  }
  function success(info) {
    return { type: profileConst.PROFILE_SUCCESS, info };
  }
  function failure(error) {
    return { type: profileConst.PROFILE_FAILURE, error };
  }
}

const follow = username => {
  return dispatch => {
    dispatch(request());
    return userService.follow(username).then(res => {
      dispatch(response(res.data.status));
      return res.data.status;
    });
  };
  function request() {
    return { type: profileConst.FOLLOW_REQUEST };
  }
  function response(response) {
    return { type: profileConst.FOLLOW_RESPONSE, response };
  }
};

const like = postId => {
  return dispatch => {
    dispatch(request(postId));
    return userService.like(postId).then(res => {
      dispatch(response(res.data.status));
      if (res.data.status == 'unliked') {
        return 'unlike';
      } else {
        return 'like';
      }
    });
  };
  function request(postId) {
    return { type: profileConst.LIKE_REQUEST, postId };
  }
  function response(response) {
    return { type: profileConst.LIKE_RESPONSE, response };
  }
};

const getProfilePosts = (limit, offset) => {
  return dispatch => {
    dispatch(request());
    userService.getProfilePosts(limit, offset).then(
      res => {
        dispatch(success(res.data.results));
      },
      err => {
        dispatch(failure(err.data));
      }
    );
  };
  function request() {
    return { type: profileConst.PROFILE_POSTS_REQUEST };
  }
  function success(posts) {
    return { type: profileConst.PROFILE_POSTS_SUCCESS, posts };
  }
  function failure(error) {
    return { type: profileConst.PROFILE_POSTS_FAILURE, error };
  }
};

const getOtherUserProfilePosts = (username, limit, offset) => {
  return dispatch => {
    dispatch(request());
    userService.getOtherUserProfilePosts(username, limit, offset).then(
      res => {
        dispatch(success(res.data.results));
      },
      err => {
        dispatch(failure(err.data));
      }
    );
  };
  function request() {
    return { type: profileConst.OTHER_USER_PROFILE_POSTS_REQUEST };
  }
  function success(posts) {
    return { type: profileConst.OTHER_USER_PROFILE_POSTS_SUCCESS, posts };
  }
  function failure(error) {
    return { type: profileConst.OTHER_USER_PROFILE_POSTS_FAILURE, error };
  }
};

const addPostToFavorite = (postId, favorite) => {
  return dispatch => {
    dispatch(request());
    userService
      .addToFavorites(postId, favorite)
      .then(res => {
        dispatch(success(res.data.status));
        dispatch(refreshProfileFavoriteList());
        dispatch(getProfileFavoriteList(5, 0));
      })
      .catch(err => {
        dispatch(failure(err.data.error));
      });
  };
  function request() {
    return { type: profileConst.ADD_FAVORITE_REQUEST };
  }
  function success(favorite) {
    return { type: profileConst.ADD_FAVORITE_SUCCESS, favorite };
  }
  function failure(error) {
    return { type: profileConst.ADD_FAVORITE_FAILURE, error };
  }
};

const removeFavorite = postId => {
  return dispatch => {
    dispatch(request());
    return userService
      .removeFavorite(postId)
      .then(res => {
        dispatch(success(res.data.status));
        dispatch(refreshProfileFavoriteList());
        dispatch(getProfileFavoriteList(5, 0));
      })
      .catch(err => {
        dispatch(failure(err.data.error));
      });
  };
  function request() {
    return { type: profileConst.REMOVE_FAVORITE_REQUEST };
  }
  function success(status) {
    return { type: profileConst.REMOVE_FAVORITE_SUCCESS, status };
  }
  function failure(error) {
    return { type: profileConst.REMOVE_FAVORITE_FAILURE, error };
  }
};

const getProfileFavoriteList = (limit, offset) => {
  return dispatch => {
    dispatch(request());
    userService.getProfileFavoriteList(limit, offset).then(
      res => {
        dispatch(success(res.data.results));
      },
      err => {
        dispatch(failure(err.data));
      }
    );
  };
  function request() {
    return { type: profileConst.FAVORITE_LIST_REQUEST };
  }
  function success(favList) {
    return { type: profileConst.FAVORITE_LIST_SUCCESS, favList };
  }
  function failure(error) {
    return { type: profileConst.FAVORITE_LIST_FAILURE, error };
  }
};

const refreshProfileFavoriteList = () => {
  return dispatch => {
    dispatch({ type: profileConst.REFRESH_PROFILE_FAVORITE_LIST });
  };
};

const refreshProfileFavoriteListItems = () => {
  return dispatch => {
    dispatch({ type: profileConst.REFRESH_PROFILE_FAVORITE_LIST_ITEMS });
  };
};

const getProfileFavoriteListItems = (id, limit, offset) => {
  return dispatch => {
    dispatch(request());
    return userService.getProfileFavoriteItems(id, limit, offset).then(
      res => {
        dispatch(success(res.data.results, id));
        return res.data.results;
      },
      err => {
        dispatch(failure(err.data));
      }
    );
  };
  function request() {
    return { type: profileConst.FAVORITE_ITEMS_REQUEST };
  }
  function success(items, id) {
    return { type: profileConst.FAVORITE_ITEMS_SUCCESS, item: items, id: id };
  }
  function failure(error) {
    return { type: profileConst.FAVORITE_ITEMS_FAILURE, error };
  }
};

const refreshProfilePosts = () => {
  return dispatch => {
    dispatch({ type: profileConst.REFRESH_PROFILE_POSTS });
  };
};

const editProfile = user => {
  return dispatch => {
    dispatch(request(user));
    const data = new FD();
    if (
      user.fullname !== '' &&
      user.fullname !== undefined &&
      user.fullname !== null
    ) {
      data.append('fullname', user.fullname);
    }

    if (
      user.fullname !== '' &&
      user.fullname !== undefined &&
      user.fullname !== null
    ) {
      data.append('bio', user.bio);
    }

    if (user.pic !== undefined) {
      if (user.pic.uri !== undefined && user.pic.mime !== undefined) {
        data.append('profile_picture', {
          uri: user.pic.uri,
          type: user.pic.mime,
          name: 'profileName'
        });
      }
    }
    return userService
      .editProfile(data)
      .then(res => {
        dispatch(success(res.data.status));
        dispatch(getProfile());
        return 'ویرایش شد';
      })
      .catch(error => {
        const { status } = error.response;
        const { data } = error.response;
        if (status === 400) {
          dispatch(failure(data.error));
        }
        return 'ویرایش ناموفق بود';
      });
  };
  function request(user) {
    return { type: profileConst.EDIT_PROFILE_REQUEST, user };
  }
  function success(data) {
    return { type: profileConst.EDIT_PROFILE_SUCCESS, data };
  }
  function failure(error) {
    return { type: profileConst.EDIT_PROFILE_FAILURE, error };
  }
};

const removeEditProfileState = () => {
  return dispatch => {
    dispatch({ type: profileConst.EDIT_PROFILE_REMOVE_STORE });
  };
};

const changePassword = user => {
  return dispatch => {
    dispatch(request());
    userService.changePassword(user).then(
      res => {
        dispatch(success(res.data.status));
      },
      error => {
        const { status } = error.response;
        const { data } = error.response;
        if (status === 400) {
          dispatch(failure(data.error));
        }
      }
    );
  };
  function request() {
    return { type: profileConst.CHANGE_PASSWORD_REQUEST };
  }
  function success(data) {
    return { type: profileConst.CHANGE_PASSWORD_SUCCESS, data };
  }
  function failure(error) {
    return { type: profileConst.CHANGE_PASSWORD_FAILURE, error };
  }
};

const addPost = post => {
  return dispatch => {
    const data = new FD();
    if (post.caption !== undefined && post.caption !== null) {
      data.append('caption', post.caption);
    } else {
      data.append('caption', '');
    }
    if (post.tag_string !== undefined && post.tag_string !== null) {
      data.append('tag_string', post.tag_string.join(' '));
    } else {
      data.append('tag_string', '');
    }
    if (post.location !== undefined && post.location !== null) {
      data.append('location', post.location);
    } else {
      data.append('location', '');
    }
    //TODO: checking file mime just to be a valid image mimes!
    if (post.image.uri !== undefined) {
      data.append('image', {
        uri: post.image.uri,
        type: post.image.mime,
        name: 'addPost.jpg'
      });
    }
    dispatch(request());
    return userService
      .addPost(data)
      .then(res => {
        dispatch(success(res.data.status));
        dispatch(refreshProfilePosts());
        dispatch(getProfilePosts(6, 0));
        // nav.navigate();
      })
      .catch(err => {
        dispatch(failure(err));
      });
  };
  function request() {
    return { type: profileConst.ADD_POST_REQUEST };
  }
  function success(data) {
    return { type: profileConst.ADD_POST_SUCCESS, data };
  }
  function failure(error) {
    return { type: profileConst.ADD_POST_FAILURE, error };
  }
};

const getComments = (postId, limit = 5, offset = 0) => {
  return dispatch => {
    dispatch(request(postId));
    return userService
      .getComments(postId, limit, offset)
      .then(res => {
        dispatch(success(res.data.results));
      })
      .catch(err => {
        dispatch(failure(err.data));
      });
  };
  function request(postId) {
    return { type: profileConst.POST_COMMENT_REQUEST, postId };
  }
  function success(comments) {
    return { type: profileConst.POST_COMMENT_SUCCESS, comments };
  }
  function failure(error) {
    return { type: profileConst.POST_COMMENT_FAILURE, error };
  }
};

const sendComment = (postId, text) => {
  return dispatch => {
    dispatch(request(postId));
    return userService
      .sendComment(postId, text)
      .then(res => {
        dispatch(success(res.data.status));
        // dispatch(refreshComments());
        // dispatch(getComments(postId));
        return 'نظر ثبت شد.';
      })
      .catch(err => {
        dispatch(failure(err.data.error));
        // return err.data.error;
      });
  };
  function request(postId) {
    return { type: profileConst.ADD_COMMENT_REQUEST, postId };
  }
  function success(response) {
    return { type: profileConst.ADD_COMMENT_SUCCESS, response };
  }
  function failure(error) {
    return { type: profileConst.ADD_COMMENT_FAILURE, error };
  }
};

const refreshComments = () => {
  return dispatch => {
    dispatch({ type: profileConst.REFRESH_COMMENTS });
  };
};

const profileActions = {
  removeEditProfileState,
  getProfile,
  editProfile,
  getProfilePosts,
  refreshProfilePosts,
  getProfileFavoriteList,
  refreshProfileFavoriteList,
  getProfileFavoriteListItems,
  refreshProfileFavoriteListItems,
  changePassword,
  addPost,
  follow,
  like,
  getComments,
  sendComment,
  refreshComments,
  addPostToFavorite,
  removeFavorite,
  getOtherUserProfilePosts
};

export default profileActions;
