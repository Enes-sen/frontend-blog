# 📝 FistBlog - Frontend (React & Redux Blog Web Application)

FistBlog, React 18 ve Redux kullanılarak geliştirilmiş, full-stack dinamik bir blog web uygulaması ön yüz (frontend) projesidir. Kullanıcıların blog gönderilerini incelemesine, yeni gönderiler ve görseller oluşturmasına, var olan gönderileri silmesine ve yorum eklemesine olanak tanır.

---

## 🚀 Öne Çıkan Özellikler

* **Gönderi Yönetimi:**
  * Tüm blog gönderilerini kronolojik sırayla listeleme.
  * Tekil gönderi detaylarını (başlık, görsel, içerik, tarih) görüntüleme.
  * Base64 görsel desteği (`react-file-base64`) ile yeni gönderi yayınlama ve var olan gönderiyi silme.
* **Etkileşimli Yorum Sistemi:**
  * Her gönderiye özel yorumları çekme ve listeleme.
  * Gönderilere dinamik olarak yeni yorum ekleme ve silme.
* **Gelişmiş Durum Yönetimi (State Management):**
  * Redux ve `redux-thunk` middleware ile asenkron API çağrıları ve global durum yönetimi.
* **Responsive ve Modern UI:**
  * Bootstrap 5, Reactstrap ve AlertifyJS ile kullanıcı dostu arayüz ve bildirim yönetimi.
  * Moment.js ile Türkçe zaman biçimlendirmesi.

---

## 📁 Proje Klasör Yapısı

```text
enes-sen-frontend-blog/
├── public/
│   └── index.html               # Ana HTML şablonu
└── src/
    ├── index.js                 # Uygulama giriş noktası ve Router/Provider kurulumu
    ├── api/
    │   └── api.js               # Axios istemcisi ve API istek servisleri
    ├── components/
    │   ├── forms/
    │   │   ├── AddCommentForm.js # Yorum ekleme formu
    │   │   └── AddpostForm.js    # Yeni gönderi yayınlama formu
    │   ├── navi/
    │   │   └── navi.js           # Üst gezinti çubuğu (Navbar)
    │   ├── post/
    │   │   ├── CommentList.js    # Yorum listeleme bileşeni
    │   │   ├── postsList.js      # Gönderi akışı ve listeleme
    │   │   └── SinglePost.js     # Gönderi detay sayfası
    │   └── root/
    │       └── App.js            # Ana rotalandırma ve düzen bileşeni
    └── redux/
        ├── actions/
        │   ├── actionTypes.js    # Redux eylem türleri (Action Types)
        │   └── postActions.js   # Asenkron Redux thunk eylemleri
        └── reducers/
            ├── config.js        # Redux Store yapılandırması
            ├── index.js         # Root Reducer (Kök düşürücü)
            └── postReducer.js   # Gönderi ve yorum durum yönetimi


[ Visitor ]
    │
    ▼ (opens)
[ App Entry (index.js) ]
    │
    ▼ (renders)
[ App Reducers (App.js) ] ──► [ Navigation (navi.js) ]
    │
    ├─► (routes to) ──► [ Posts List (postsList.js) ] ───┐
    ├─► (routes to) ──► [ Post Detail (SinglePost.js) ] ─┼─► (dispatches fetch/create/delete)
    └─► (routes to) ──► [ Post Form (AddpostForm.js) ] ──┘
                               │
                               ▼
                    [ State and Requests ]
                    ├── [ Redux Store (config.js) ]
                    ├── [ Post Actions (postActions.js) ]
                    └── [ Post State (postReducer.js) ]
                               │
                               ▼ (calls)
                         [ API Client (api.js) ]
                               │
                               ▼ (sends requests)
                         [ Remote Service: Blog API ]
                         ([https://fistblog.onrender.com](https://fistblog.onrender.com))/not active rightnow
