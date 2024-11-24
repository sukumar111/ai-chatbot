<h1 align="center">Hi 👋, I'm Sukumar</h1>
<h3 align="center">A passionate full stack developer from India</h3>


# ai-chatbot

# AI Chatbot with Dynamic Features

This project is a fully functional AI Chatbot application built using **ReactJS** for the frontend and **Spring Boot** for the backend. The application leverages the **Gemini external API** to process user inputs and generate responses dynamically. It includes multiple user-friendly features such as themes, email notifications, password management, and third-party sign-ins.

---

## Features

### **Login Page**
1. **Dark and Light Themes**: Users can toggle between dark and light modes for a comfortable user experience.
2. **Sign-Up Form**: 
   - Fields: Full Name, Email, and Password.
   - Password is encoded and securely stored in the database.
   - Optional checkbox for receiving updates via email.
   - Confirmation email sent upon successful registration.
3. **Login Functionality**: 
   - Users can log in using their registered email ID and password.
   - Password is securely decoded for authentication.
4. **Reset Your Password**:
   - Users can reset their password directly on the login page using their email ID.
   - Confirmation email sent upon password reset.
5. **Third-Party Sign-Ins**:
   - Sign in with Google.
   - Sign in with LinkedIn.

### **After Login - AI Chatbot Page**
1. **Personalized Greeting**:
   - Displays "Welcome, [Full Name]" dynamically at the top left.
2. **Logout Button**:
   - Redirects users to the sign-in page.
3. **New Chat**:
   - Refreshes the page and opens a new chatbox for the user.
4. **Feature Button**:
   - Redirects users to a blog page titled **"The Rise of AI-Chatbots SRM Mini-Project: Key Features and Benefits"**.
5. **AI Chatbot Functionality**:
   - Processes user requests and responds dynamically using the **Gemini API**.
   - Both user requests and chatbot responses are displayed in **JSON format**.

---

## Project Structure

### **Frontend**
- **Technology**: ReactJS
- **Key Libraries**:
  - Material-UI for components and styling.
  - Axios for API communication.
  - React Router for navigation.
- **Main Features**:
  - Responsive UI with dark/light themes.
  - Form validations and email confirmations.
  - Dynamic components for AI Chat functionality.

### **Backend**
- **Technology**: Spring Boot
- **Key Features**:
  - RESTful APIs for user authentication and data handling.
  - Password encoding and decoding using Spring Security.
  - Email notifications using Java Mail Sender.
- **Database**: MySQL
  - Stores user credentials securely.

### **External API**
- **Gemini API**:
  - Processes user inputs and generates intelligent responses.
  - Integrated dynamically within the chatbot functionality.

---

## Installation and Setup

### **Prerequisites**
- Node.js and npm installed.
- Java Development Kit (JDK) installed.
- MySQL database setup.

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-chatbot.git
   cd ai-chatbot/frontend

2. Install dependencies:
    ```bash 
    npm install

3. Start the development server:
    ```bash 
    npm start

4. Open the application in your browser at:
    ```bash 
    http://localhost:3000


### **Backend Setup**

1. Navigate to the backend directory:
     ```bash 
     cd ai-chatbot/backend

2. Configure the database in application.properties:
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/ai_chatbot_db
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    spring.jpa.hibernate.ddl-auto=update

3. Set up email configurations (for sending notifications)
   ```bash
   spring.mail.host=smtp.your-email-provider.com
   spring.mail.port=587
   spring.mail.username=your-email@example.com
   spring.mail.password=your-email-password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true

4. Build and run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run

5. Ensure the backend is running on 
   ```bash
   http://localhost:8080.


## How It Works

- **User Registration**:
   ```bash
   Password is encoded and stored in the database. Users receive an email confirmation upon successful registration.

- **Login and Password Management**:
   ```bash
   Login credentials are authenticated, and the  password is decoded securely.Password reset functionality ensures secure updates, with confirmation emails.

- **AI Chatbot**:
   ```bash
   Users interact with the chatbot via a simple interface.Requests and responses are processed using the Gemini API and displayed in JSON format.

- **Themes and Navigation**:
   ```bash
   Users can toggle between dark and light themes.Navigate seamlessly between the chat and feature pages.


<h3 align="left">Do you have doubts connect with me:</h3>
<p align="left">
<a href="https://linkedin.com/in/sukumar-munusamy-a16444182/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="sukumar-munusamy-a16444182/" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools Used:</h3>
<p align="left"> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>

<h3 align="left">Support Me:</h3>
<p><a href="https://www.buymeacoffee.com/Sukumar111"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Sukumar" /></a></p><br><br>
