e-commerce-apis

Auth APIs

1. Register

URL : /api/auth/register
Method: POST
Request :
{
    "userName": "siva@gmail.com",
    "password": "12345678",
    "userType": "seller"
}

Response:
{
    "message": "User added successfully!"
}

2. Login

URL : /api/auth/login
Method: POST
Request:
{
    "userName": "siva@gmail.com",
    "password": "12345678"
}
Response:
{
    "message": "logged in successfully !",
    "access_token": "access token"
}

Buyer APIs

1. List Of Sellers

URL : api/buyer/list-of-sellers
Method: GET
Request:
Pass the acces token in the hearders as Bearer token
Response:
[
    {
        "userName": "s1@gmail.com",
        "id": "SE-23030809062727"
    },
    {
        "userName": "s2@gmail.com",
        "id": "SE-23030809115252"
    }
]

2. Seller Catalog

URL: /api/buyer/seller-catalog?seller_id=SE-23030809062727
Method: GET
Request:
Pass the access token in the headers 
Pass the seller_id in the param
Response:
[
    {
        "name": "apple",
        "price": 100,
        "productId": "apple-SE-23030809062727"
    },
    {
        "name": "bag",
        "price": 200,
        "productId": "bag-SE-23030809062727"
    }
]

3. Create Order

URL:api/buyer/create-order?seller_id=SE-23030809062727
Method: POST
Request:
Pass the access token in the headers 
Pass the seller_id in the param
body
[
    {
        "productId": "apple-SE-23030809062727",
        "quantity":1
    }
]

Response:
{
    "message": "Order created successfully !"
}

Seller APIs

1.Create-catalog

URL :/api/seller/create-catalog
Method: POST

Request:
Pass the acces token in the hearders as Bearer token
Body:
[
    {
        "name": "apple",
        "price": 100
    },
    {
        "name": "bag",
        "price": 200
    }
]

Response:
{
    "No Of records created": 0,
    "No of records updated": 2,
    "Invalid records": 0
}

2. Get Orders

URL : api/seller/orders
Method: GET
Request:
Pass the acces token in the hearders as Bearer token

Response:
[
    {
        "orderId": "OD-23030809350909",
        "buyerId": "BU-23030809275050",
        "products": [
            {
                "productId": "camera-SE-23030809062727",
                "quantity": 10,
                "_id": "6408b235db543019855819d0"
            },
            {
                "productId": "shirt-SE-23030809062727",
                "quantity": 9,
                "_id": "6408b235db543019855819d1"
            },
            {
                "productId": "shorts-SE-23030809062727",
                "quantity": 7,
                "_id": "6408b235db543019855819d2"
            },
            {
                "productId": "mobile-SE-23030809062727",
                "quantity": 4,
                "_id": "6408b235db543019855819d3"
            }
        ]
    },
    {
        "orderId": "OD-23030809421616",
        "buyerId": "BU-23030809275050",
        "products": [
            {
                "productId": "camera-SE-23030809062727",
                "quantity": 10,
                "_id": "6408b3e0cead3581e027e2c9"
            },
            {
                "productId": "shirt-SE-23030809062727",
                "quantity": 9,
                "_id": "6408b3e0cead3581e027e2ca"
            },
            {
                "productId": "shorts-SE-23030809062727",
                "quantity": 7,
                "_id": "6408b3e0cead3581e027e2cb"
            },
            {
                "productId": "mobile-SE-23030809062727",
                "quantity": 4,
                "_id": "6408b3e0cead3581e027e2cc"
            }
        ]
    }
]







