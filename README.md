# Chatbot Project

This README is available in both English and Turkish.  
[Check the Turkish Explanation](#turkish-version)

---

## English Version

### Project Structure
The project has two main directories:
- `frontend`: The frontend application developed with Next.js
- `backend`: The backend application developed with NestJS

Both directories are housed under the main `bolt-task` directory and can function independently.

### Backend: NestJS

The NestJS backend communicates with MongoDB to store questions and user responses. It includes schemas and API endpoints for the application.

#### Question Schema

The `Question` schema defines the structure for questions stored under a specific `chatNumber` and `chatName`. This schema contains a `chatQuestions` field, which holds the details for each question.

#### Example Structure:

```js
{
  id: "UUID()",
  createdDate: "NOW()",
  chatNumber: 1,
  chatName: "Cat Questions",
  chatQuestions: [
    { questionText: "What is your favorite breed of cat, and why?" },
    { questionText: "How do you think cats communicate with their owners?" },
    ...
  ]
}
```
#### UserAnswer Schema

The `UserAnswer` schema stores responses from users under a specific `chatNumber` and `userId`. Additionally, it includes a `lastRespondDatetime` field to track when the user last responded.

#### Example Structure:

```js
{
  id: "UUID()",
  userId: "123",
  createdDate: "NOW()",
  chatNumber: 1,
  chatAnswers: [
    { answerText: "Siamese" },
    { answerText: "With their eyes" },
    ...
  ],
  lastRespondDatetime: "2024-10-04T12:00:00.000Z"
}

```

API Endpoints
GET /questions - Retrieves all questions.
POST /user-answers/
/
/
- Saves the user's response for a specific question.
  GET /user-answers/
  /
- Retrieves all responses for a given user and chatNumber.

### Frontend: Next.js
The frontend application provides an interface for users to answer questions. Developed using Next.js, the app delivers a fast and user-friendly experience.

### Chatbot Component
This component sequentially presents questions to the user and allows them to respond. Responses are stored in the backend and the next question is shown.

### Setup
Requirements:
- Node.js
- MongoDB

### Steps

### Backend Setup:

- Add your MongoDB connection URL to the `.env` file:


    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase
    cd backend
    npm install
    npm run start:dev

### Frontend Setup:

    cd frontend
    npm install
    npm run dev

### Usage
After launching the application, use the frontend interface to interact with the chatbot. The backend API manages data storage and retrieval in MongoDB.

`This project offers a dynamic way to save and display user responses. If you have any questions, feel free to reach out. Happy coding!`


### Features:

- <b>Add New Chat:</b>  Future support for adding new chats.
- <b> Navigation Between Responses and Questions: </b> Users can review previously answered questions.




---

## Turkish Version <a id="turkish-version"></a>

### Proje Yapısı
Proje, iki ana klasör içerir:
- `frontend`: Next.js ile geliştirilmiş frontend uygulaması
- `backend`: NestJS ile geliştirilmiş backend uygulaması

Her iki klasör, `bolt-task` ana klasörü altında yer alır ve birbirlerinden bağımsız olarak çalışabilir.

### Backend: NestJS

NestJS backend, MongoDB ile iletişim kurarak soruları ve kullanıcı yanıtlarını saklar. Şemalar ve API endpointleri içerir.

#### Question Schema

`Question` şeması, belirli bir `chatNumber` ve `chatName` altında saklanan soruların yapısını tanımlar. Bu şema, her bir sorunun detaylarını içeren `chatQuestions` alanını barındırır.

#### Örnek Yapı:

```js
{
  id: "UUID()",
  createdDate: "NOW()",
  chatNumber: 1,
  chatName: "Cat Questions",
  chatQuestions: [
    { questionText: "What is your favorite breed of cat, and why?" },
    { questionText: "How do you think cats communicate with their owners?" },
    ...
  ]
}
```
#### UserAnswer Schema

`UserAnswer` şeması, kullanıcıların belirli bir `chatNumber` ve `userId` altında verdiği yanıtları saklamak için kullanılır. `lastRespondDatetime` alanı, kullanıcının en son ne zaman yanıt verdiğini takip eder.

#### Example Structure:

```js
{
  id: "UUID()",
  userId: "123",
  createdDate: "NOW()",
  chatNumber: 1,
  chatAnswers: [
    { answerText: "Siamese" },
    { answerText: "With their eyes" },
    ...
  ],
  lastRespondDatetime: "2024-10-04T12:00:00.000Z"
}

```

API Endpoints
GET /questions - Tüm soruları getirir.
POST /user-answers/
/
/
-  Belirli bir kullanıcı için yanıtı kaydeder.
  GET /user-answers/
  /
- Belirli bir kullanıcı ve chatNumber için tüm yanıtları getirir.

### Frontend: Next.js
Frontend uygulaması, kullanıcıların soruları yanıtlayabilmesi için bir arayüz sağlar. Next.js, hızlı ve kullanıcı dostu bir deneyim sunar.

### Chatbot Component
Bu bileşen, kullanıcıya sırayla sorular yöneltir ve kullanıcıdan yanıt alır. Yanıtlar alındıkça, backend'e kaydedilir ve sonraki soruya geçilir.

### Setup
Requirements:
- Node.js
- MongoDB

### Steps

### Backend Kurulum:

- `.env` dosyasına MongoDB bağlantı URL'sini ekleyin:


    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase
    cd backend
    npm install
    npm run start:dev

### Frontend KUrulum:

    cd frontend
    npm install
    npm run dev

### Kullanım
Uygulamayı başlattıktan sonra, frontend üzerinden chatbot arayüzünü kullanarak soruları yanıtlayabilirsiniz. Backend API'si, MongoDB'de verileri kaydetme ve yönetme işlevini sağlar.

`Bu proje, kullanıcıların yanıtlarını dinamik olarak kaydetme ve görselleştirme olanağı sunar. Projeyle ilgili herhangi bir sorunuz olursa lütfen bana ulaşın. İyi çalışmalar!`


### Geliştirmeler:

- <b>Yeni Sohbet Ekleme:</b> Gelecekte kullanıcıya yeni sohbetler ekleme imkanı sağlanabilir.
- <b>Yanıtlar ve Sorular Arasında Gezinme:</b>  Kullanıcı yanıtladığı sorulara tekrar bakabilir.

