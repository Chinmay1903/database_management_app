# database_management_app - A Simple Django and React-Based Database Management Tool

database_management_app is a simplified database management tool that provides an easy-to-use graphical user interface for interacting with a PostgreSQL database. The goal is to offer essential CRUD operations and SQL query execution with a modern, intuitive interface.

---

## 🚀 **Key Features**

1. **User Authentication:**
   - Register and Login using JWT.
   - Secure authentication with access and refresh tokens.

2. **Dashboard:**
   - View and manage database records.
   - Edit and Delete individual records.
   - Add new records using a modal form.

3. **SQL Query Execution:**
   - Run custom SQL queries.
   - View the result in a structured table format.
   - Display error messages for invalid queries.

4. **Responsive and Modern UI:**
   - Sticky top navigation bar with active link highlighting.
   - Popup modals for adding and editing records.

5. **Common Navbar:**
   - Navigation to Dashboard and SQL Query page.
   - Logout button to end the session.

---

## 🛠️ **Tech Stack**

- **Backend:**
  - Django
  - Django REST Framework
  - PostgreSQL
  - JWT Authentication

- **Frontend:**
  - React
  - React Bootstrap
  - Axios
  - JWT Decode
  - React Router

- **Deployment:**
  - Docker
  - Docker Compose

---

## ⚙️ **Setup Instructions**

### **Step 1: Clone the Repository**
```bash
git clone git@github.com:Chinmay1903/database_management_app.git
cd database_management_app
```

### **🐋 Step 2: Run Docker Compose**
```bash
docker-compose up --build -d
```

### **🔄 Step 3: Database Migrations**
#### **Run Migrations:**
```bash
docker-compose exec backend python manage.py makemigrations api
docker-compose exec backend python manage.py migrate
```

#### **Create a Superuser:**
```bash
docker-compose exec web python manage.py createsuperuser
```
#### **Access Admin Panel:**
```bash
http://localhost:8000/admin
```

### **💻 Step 4: Access the Application**
**Backend (Django):**
```arduino
http://localhost:8000/
```
**Frontend (React):**
```arduino
http://localhost:3000/
```

## **Steps to Use**
1. Create the user for Login to use the app.
2. Register to create new user or  create user from admin panel in Home › Api › Users.
3. In Dashborad click `Add Record` to add record, `Edit`  to edit the record and `Delete`e to delete the record.
4. In SQL Query can add any query and click `Execute` to get query output. 
