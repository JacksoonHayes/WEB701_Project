# WEB701_Project

## PROJECT BRIEF
The Grow & Give charity is a food donation charity in the Nelson region who offer local fresh produce to the community. We need a website for the Nelson region for members of the charity to provide fresh produce and excess product that is still usable. The charity is initially aimed at donating locally sourced fresh fruit, vegetables and berries but has potential to expand into all food item donations in the long-term.
The purpose of the new website is to help with the distribution of the service or product by members of our charity to customers. Like a “food bank”, the website lets members register and describe the service or products they are providing, the number and frequency of the offerings.  The website lets members of the community (beneficiaries) access the service, by providing tokens that can be “spent” in the service. To achieve our goal, we would like to have an online token function on our website that let a beneficiary access a limited number of tokens, for example the system needs a mechanism that verifies that a member of the community is accessing the service and that the token belongs to a particular community member. The website needs some homepage text about general information of our products and services such as: types, characteristics, quality factor, usage and benefit.
We require the following features on the website:
1.	Charity members and beneficiaries can register, log in and administer their own accounts. 
2.	Members use the website to register their products and services, and beneficiaries use the system to acquire tokens.
3.	Interactive element(s) that engages the website user.
4.	The system provides an interface that the members can use to accept a token in a transaction.

## Running the App
1. Install dependencies
```bash
npm install
```

2. Create a .env file in the root directory and add the following:
```bash
PORT=3001
MONGODB_URI=mongodb+srv://dbAdmin:admin@growandgive.x8icc.mongodb.net/?retryWrites=true&w=majority&appName=growandgive
JWT_SECRET="secret"
```

3. To run the backend server, run the following:
```bash
nodemon
```

4. Install Angular dependencies by running the following in the /frontend directory:
```bash
npm install
```

5. To run the Angular frontend, run the following in the /frontend directory:
```bash
ng serve
```
