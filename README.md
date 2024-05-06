We have four endpoints in the code above:

POST auth/register is used to create a new user
POST auth/login is used to log in a registered user
To verify the user, we use the LocalAuthGuard
GET auth/user is used to access the user’s profile
We used JwtGuard to authenticate the user
We used RolesGuard plus @Roles decorator to provide the appropriate authorization depending on the user’s roles
GET auth/admin is used to access the admin dashboard
We also used JwtGuard and RolesGuard as done in the previous endpoint


We’ll create the following API endpoints:

POST store/products/ — add new product
GET store/products/ — get all products
GET store/products/:id — get single product
PUT store/products/:id — edit single product
DELETE store/products/:id — remove single product
Open the product.controller.ts file and replace its content with the following: