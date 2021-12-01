import firebase from '../scriptsFiles/firebaseconfig';
import { AsyncStorage } from 'react-native';


export const updateName = (data) => {
    return (dispatch) => { dispatch({ type: 'updateName', payload: data }) }
}
export const updateLast = (data) => {
    return (dispatch) => { dispatch({ type: 'updateLast', payload: data }) }
}
export const updateNumber = (data) => {
    return (dispatch) => { dispatch({ type: 'alternate', payload: data }) }
}

export const updateAlterNumber = (data) => {
    return (dispatch) => { dispatch({ type: 'updateNumber', payload: data }) }
}
export const updateAddress = (data) => {
    return (dispatch) => { dispatch({ type: 'updateAddress', payload: data }) }
}
export const updateState = (data) => {
    return (dispatch) => { dispatch({ type: 'updateState', payload: data }) }
}
export const updateDistrict = (data) => {
    return (dispatch) => { dispatch({ type: 'updateDistrict', payload: data }) }
}
export const updateMandal = (data) => {
    return (dispatch) => { dispatch({ type: 'updateMandal', payload: data }) }
}
export const updateShop = (data) => {
    return (dispatch) => { dispatch({ type: 'updateShop', payload: data }) }
}
export const updateCategory = (data) => {
    return (dispatch) => { dispatch({ type: 'updateCategory', payload: data }) }
}
export const forgotPassword = (data) => {
    return async (dispatch) => {
        dispatch({ type: 'isLoading' })
        await firebase.auth().sendPasswordResetEmail(data).then(()=>{
            dispatch({ type: 'forgotPassword', payload: 'success' })
            alert('Password Reset link has sent to your gmail,plz verify')

        }).catch((err)=>{
            alert(err)
        })
    }
}

export const Login = (userid, pwd) => {
    return (dispatch) => {
        dispatch({ type: 'isLoading', payload: 'fail' })
        firebase
            .auth()
            .signInWithEmailAndPassword(userid, pwd)
            .then(async (result) => {
                if (result.user.emailVerified === false) {
                    firebase.auth().signOut().then(() => {
                        alert("Your Email is not verified");
                        dispatch({ type: 'Login', payload: 'fail' })

                    })
                } else {
                    await AsyncStorage.setItem('id', result.user.uid);
                    dispatch({ type: 'Login', payload: 'success' })
                }
            })
            .catch((err) => {
                dispatch({ type: 'Login', payload: 'fail' })
                alert(err)
            })
    }
}
export const SETDATA = (data) => {
    return (dispatch) => {
        { dispatch({ type: 'isLoading' }) }
        if (data != "") {
            firebase.
                database().
                ref('/user/' + data)
                .on('value', snapshot => {
                    { dispatch({ type: 'SETDATA', payload: snapshot.val() }) }
                });
        } else {
            let USERDATA = {
                email: '',
                first: '',
                id: '',
                last: '',
                mobile: '',
                mandal: '',
                district: '',
                State: '',
                category: '',
                shop: '',
                address: '',
                shop: {
                }
            }
            { dispatch({ type: 'SETDATA', payload: USERDATA }) }
        }
    }
}

export const SETSHOP = (data) => {
    let display = [];
    return (dispatch) => {
        firebase.
            database().
            ref('/Shops/' + data)
            .once('value', snapshot => {
                snapshot.forEach((child) => {
                    display.push(child.val())
                })
                let index = 0;
                for (let i = 0; i < display.length; i++) {
                    let image = [];
                    if (display[i].shopImage) {
                        let keys = Object.keys(display[i].shopImage)
                        if (keys != undefined) {
                            for (let k = 0; k < keys.length; k++) {
                                image.push(display[i].shopImage[keys[k]])
                            }
                        }
                    }
                    display[i].shopImage = { ...image }
                    index++
                }
                Promise.all(index).then(() => {
                    dispatch({
                        type: 'SETSHOP',
                        payload: display
                    })
                })
            });
    }
}
export const SETSHOPKEYS = (value) => {
    let ke = [];
    return async (dispatch) => {
        await firebase.database()
            .ref('/Shops/' + value).once('value', snapshot => {
                {
                    if (snapshot.val()) {
                        ke.push(Object.keys(snapshot.val()))
                    }
                }
            })
        dispatch({ type: 'SHOPKEYS', payload: ke })
    }
}
export const UpdateShop = (data, shopid, userid) => {
    return async (dispatch) => {
        dispatch({ type: 'isLoading' })
        await firebase
            .database()
            .ref('/Shops/' + userid + '/' + shopid)
            .update(data)
            .then(() => {
                alert('Successfully Updated....')
            }).catch((err) => {
                alert(err)
            })
        dispatch({ type: 'updateShop', payload: data })

    }

}
export const CreateShop = (data, id) => {
    return async (dispatch) => {
        await dispatch({ type: 'isLoading' })
        await firebase
            .database()
            .ref('/Shops/' + id + '/')
            .push(data)
            .then(async () => {
                if (data.shopImage != "") {
                    let dataKey = [];
                    await firebase.database()
                        .ref('/Shops/' + id).once('value', async snapshot => {
                            {
                                if (snapshot.val()) {
                                    await dataKey.push(Object.keys(snapshot.val()))
                                }
                            }
                        }).then(async () => {
                            let index = (dataKey[0].length);
                            let sKey = dataKey[0][index - 1];
                            let url = [];
                            for (let i = 0; i < Object.keys(data.shopImage).length; i++) {
                                let uri = await decodeURI(data.shopImage[i].uri);
                                let respo = await fetch(uri)
                                const blob = await respo.blob();
                                let path = firebase.storage().ref()
                                    .child('/ShopImages/' + id + '/' + sKey + '/' + ("shop" + i))
                                await path.put(blob).then(async () => {
                                    await path.getDownloadURL().then(async (result) => {
                                        await url.push(result);
                                    }).catch((err) => {
                                        alert(err)
                                    })
                                })
                            }
                            Promise.all(url).then(async () => {
                                await firebase.database().ref('/Shops/' + id + '/' + sKey + '/')
                                    .update({ shopImage: { ...url } })
                            })
                            alert('SuccessFully Created......')
                            await dispatch({ type: 'CreateShop' })
                        })

                } else {
                    { dispatch({ type: 'CreateShop' }) }
                }
            }).catch((err) => {
                alert(err + 'Hello')
            })

    }

}
export const Logout = () => {
    return (dispatch) => { dispatch({ type: 'Logout' }) }
}
export const UPDATEPIC = (data, id) => {
    return async (dispatch) => {
        { dispatch({ type: 'isLoading' }) }
        let uri = await decodeURI(data);
        let respo = await fetch(uri)
        const blob = await respo.blob();
        let path = await firebase.storage().ref('/userImages/' + id)
        await path.put(blob)
            .then(() => {
                path.getDownloadURL().then((result) => {
                    let url = result;
                    firebase.database().ref('/user/' + id + '/').update({ image: url }).then(() => {
                        { dispatch({ type: 'UPDATEPIC', payload: url }) }
                        alert('Successfully Updated...')
                    })
                }).catch((err) => {
                    alert("Erro", err)
                    { dispatch({ type: 'UPDATEPIC', payload: url }) }
                })

            }).catch((err) => {
                alert('Error', err)
                { dispatch({ type: 'UPDATEPIC', payload: url }) }
            })
    }

}

export const shopImage = (data, userid, shopid) => {
    return async (dispatch) => {
        { dispatch({ type: 'isLoading' }) }
        let dataKey = [];
        await firebase.database()
            .ref('/Shops/' + userid + "/" + shopid + '/' + 'shopImage')
            .once('value', async snapshot => {
                {
                    if (snapshot.val()) {
                        snapshot.val().forEach(async (value) => {
                            await dataKey.push(value)
                        })
                    }
                }
            }).then(async () => {
                let len = 0;
                for (let i = 0; i < data.length;) {
                    let uri = await decodeURI(data[i].uri);
                    let respo = await fetch(uri)
                    const blob = await respo.blob();
                    let path = await firebase.storage().ref().child('/ShopImages/' + userid + '/' + shopid + '/' + 'shop' + dataKey.length)
                    await path.put(blob).then(async () => {
                        await path.getDownloadURL().then(async (result) => {
                            await dataKey.push(result)
                            i++;
                        })
                    })
                }
                Promise.all(len).then(async () => {
                    await firebase.database()
                        .ref('/Shops/' + userid + '/' + shopid)
                        .update({ shopImage: dataKey }).
                        then(() => {
                            { dispatch({ type: 'shopImage', payload: dataKey }) }
                            alert('SuccessFully Inserted......')
                        })
                })
            })


    }
}
export const updateEmail = (oldmail, newmail, password) => {
    return async (dispatch) => {
        { dispatch({ type: 'isLoading', }) }
        const emailCred =
            await
                firebase
                    .auth
                    .EmailAuthProvider
                    .credential(oldmail, password)

        await firebase
            .auth()
            .currentUser
            .reauthenticateWithCredential(emailCred)
            .then(async () => {
                await firebase.auth().currentUser.updateEmail(newmail)
                    .then(async () => {
                        firebase.auth().currentUser.sendEmailVerification({
                            //handleCodeInApp: true,
                            //url: 'https://mmsfirebase-8f388.firebaseapp.com/__/auth/action',
                        }).then(async () => {
                            await firebase.database().ref('/user/' + firebase.auth().currentUser.uid).update({ email: newmail })
                                .then(() => {
                                    { dispatch({ type: 'updateEmail', payload: 'success' }) }
                                }).catch((err) => {
                                    { dispatch({ type: 'updateEmail', payload: 'fail' }) }
                                    alert(err)
                                })
                        }).catch((err) => {
                            { dispatch({ type: 'updateEmail', payload: 'fail' }) }
                            alert(err)
                        })
                    }).catch((err) => {
                        { dispatch({ type: 'updateEmail', payload: 'fail' }) }
                        alert(err)
                    })
            })
            .catch((err) => {
                { dispatch({ type: 'updateEmail', payload: 'fail' }) }
                alert(err)
            })
    }
}
export const Suggestion = (data, id) => {
    return async (dispatch) => {
        { dispatch({ type: 'isLoading' }) }
        firebase
            .database()
            .ref('/FeedBack/' + id)
            .update(data)
            .then(() => {
                alert("Thank You For Your Feedback")
                { dispatch({ type: 'suggest' }) }
            })
    }
}
export const updatePassword = (oldPass, newPass) => {
    return async (dispatch) => {
        { dispatch({ type: 'isLoading', }) }
        const emailCred =
            await
                firebase
                    .auth
                    .EmailAuthProvider
                    .credential(firebase.auth().currentUser.email, oldPass)

        await firebase
            .auth()
            .currentUser
            .reauthenticateWithCredential(emailCred)
            .then(async () => {
                await firebase.auth().currentUser.updatePassword(newPass)
                    .then(() => {
                        { dispatch({ type: 'updatePassword', payload: 'success' }) }

                    })
            })
            .catch((err) => {
                { dispatch({ type: 'updatePassword', payload: 'fail' }) }
                alert(err)
            })
    }
}
export const deleteShop = (userid, shopid) => {
    return async (dispatch) => {
        { dispatch({ type: 'isLoading', }) }
        await firebase
            .database()
            .ref('/Shops/' + userid + '/' + shopid + '/shopImage/')
            .once('value', snapshot => {
                if (snapshot.val()) {
                    let imagesKeys = Object.keys(snapshot.val())
                    imagesKeys.forEach(async (data) => {
                        await firebase.storage().ref('/ShopImages/' + userid + '/' + shopid + '/' + 'shop' + data).delete()
                    })
                }
            }).then(async () => {
                await firebase.database().ref('/Shops/' + userid + '/' + shopid).remove().then(() => {
                    { dispatch({ type: 'deleteShop' }) }
                    alert('SuccessFully Deleted')

                }).catch((err) => {
                    { dispatch({ type: 'deleteShop' }) }
                    alert(err)
                })
            }).catch((err) => {
                { dispatch({ type: 'deleteShop' }) }
                alert(err)
            })
        { dispatch({ type: 'deleteShop' }) }

        /*  await firebase.database().ref('/Shops/' + userid + '/' + shopid).remove().then(() => {
              { dispatch({ type: 'deleteShop' }) }
              alert('SuccessFully Deleted')
  
          }).catch((err) => {
              { dispatch({ type: 'deleteShop' }) }
              alert(err)
          });*/

    }
}