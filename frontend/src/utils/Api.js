class Api {
    constructor(item) {
        this._url = item.url;
        this._headers = item.headers;
    }

    _getRequest(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

     getMassivCards(){
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(res => {
                return this._getRequest(res)
            })
    }

    addNewCard(item) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(item)
        })
          .then((res) => {
            return this._getRequest(res)
          })
      }

      deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers
        })
          .then((res) => {
            return this._getRequest(res)
          })
      }

      getProfileInfo(){
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
          })
            .then((res) => {
              return this._getRequest(res)
            })
      }

      renameProfileInfo(item) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(item)
        })
          .then((res) => {
            return this._getRequest(res)
          })
      }

      replaceProfileAvatar(item) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(item)
        })
          .then((res) => {
            return this._getRequest(res)
          })
      }

      getCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method:'PUT',
          headers: this._headers,
        })
          .then((res) => {
            return this._getRequest(res)
          });
      }
      
      deleteCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method:'DELETE',
          headers: this._headers,
        })
          .then((res) => {
            return this._getRequest(res)
          });
      }
}

export const api = new Api({
  url: "https://api.alexanderpar.students.nomoredomains.sbs",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
