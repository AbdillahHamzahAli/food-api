# 📘 API Documentation - Recipe API

## 📌 Base URL

```
https://food-api-v10.vercel.app/api
```

---

## 📍 1. Get Recipe by ID

### **Endpoint:**

```http
GET https://food-api-v10.vercel.app/api/recipes/{recipeId}
```

### **Description:**

Mendapatkan detail resep berdasarkan ID.

### **Path Parameters:**

| Parameter  | Type  | Required | Description   |
| ---------- | ----- | -------- | ------------- |
| `recipeId` | `int` | ✅ Yes   | ID dari resep |

### **Response:**

```json
{
  "data": {
    "id": 1,
    "title": "Nasi Goreng Enakkkk",
    "description": "Nasi goreng khas Indonesia dengan bumbu spesial.",
    "cookingTime": 15,
    "servings": 2,
    "category": "Makanan Utama",
    "thumbnail": "https://example.com/nasigoreng.jpg",
    "ingredients": [
      {
        "id": 1,
        "name": "Nasi putih",
        "quantity": "2 piring"
      },
      {
        "id": 2,
        "name": "Bawang putih",
        "quantity": "2 siung"
      },
      {
        "id": 3,
        "name": "Kecap manis",
        "quantity": "2 sdm"
      }
    ],
    "steps": [
      {
        "id": 1,
        "stepNumber": 1,
        "intruction": "Panaskan minyak di wajan, tumis bawang putih sampai harum."
      },
      {
        "id": 2,
        "stepNumber": 2,
        "intruction": "Masukkan telur, aduk hingga matang."
      },
      {
        "id": 3,
        "stepNumber": 3,
        "intruction": "Masukkan nasi putih, aduk hingga merata."
      }
    ]
  }
}
```

---

## 📍 2. Search Recipes

### **Endpoint:**

```http
GET https://food-api-v10.vercel.app/api/recipes
```

### **Description:**

Mencari resep berdasarkan filter atau kata kunci.

### **Query Parameters (Opsional):**

| Parameter  | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| `title`    | `string` | Mencari berdasarkan nama resep |
| `category` | `string` | Mencari berdasarkan kategori   |
| `page`     | `int`    | Halaman pencarian              |
| `size`     | `int`    | Jumlah resep per halaman       |

### **Response Contoh:**

```http
GET https://food-api-v10.vercel.app/api/recipes?title=nasi&category=utama&page=1&size=1
```

```json
{
  "data": [
    {
      "id": 1,
      "title": "Nasi Goreng Enakkkk",
      "description": "Nasi goreng khas Indonesia dengan bumbu spesial.",
      "cookingTime": 15,
      "servings": 2,
      "category": "Makanan Utama",
      "thumbnail": "https://example.com/nasigoreng.jpg",
      "ingredients": [
        {
          "id": 1,
          "name": "Nasi putih",
          "quantity": "2 piring"
        },
        {
          "id": 2,
          "name": "Bawang putih",
          "quantity": "2 siung"
        },
        {
          "id": 3,
          "name": "Kecap manis",
          "quantity": "2 sdm"
        }
      ],
      "steps": [
        {
          "id": 1,
          "stepNumber": 1,
          "intruction": "Panaskan minyak di wajan, tumis bawang putih sampai harum."
        },
        {
          "id": 2,
          "stepNumber": 2,
          "intruction": "Masukkan telur, aduk hingga matang."
        },
        {
          "id": 3,
          "stepNumber": 3,
          "intruction": "Masukkan nasi putih, aduk hingga merata."
        }
      ]
    }
  ],
  "paging": {
    "current_page": 1,
    "size": 5,
    "total_page": 1
  }
}
```

---

## 📍 3. Get Ingredients by Recipe ID

### **Endpoint:**

```http
GET https://food-api-v10.vercel.app/api/recipes/{recipeId}/ingredients
```

### **Description:**

Mendapatkan daftar bahan (ingredients) berdasarkan resep tertentu.

### **Path Parameters:**

| Parameter  | Type  | Required | Description   |
| ---------- | ----- | -------- | ------------- |
| `recipeId` | `int` | ✅ Yes   | ID dari resep |

### **Response Contoh:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Nasi putih",
      "quantity": "2 piring"
    },
    {
      "id": 2,
      "name": "Bawang putih",
      "quantity": "2 siung"
    },
    {
      "id": 3,
      "name": "Kecap manis",
      "quantity": "2 sdm"
    },
    {
      "id": 4,
      "name": "Telur",
      "quantity": "1 butir"
    }
  ]
}
```

---

## 📍 4. Get Steps by Recipe ID

### **Endpoint:**

```http
GET https://food-api-v10.vercel.app/api/recipes/{recipeId}/steps
```

### **Description:**

Mendapatkan langkah-langkah memasak berdasarkan resep tertentu.

### **Path Parameters:**

| Parameter  | Type  | Required | Description   |
| ---------- | ----- | -------- | ------------- |
| `recipeId` | `int` | ✅ Yes   | ID dari resep |

### **Response Contoh:**

```json
{
  "data": [
    {
      "id": 1,
      "stepNumber": 1,
      "intruction": "Panaskan minyak di wajan, tumis bawang putih sampai harum."
    },
    {
      "id": 2,
      "stepNumber": 2,
      "intruction": "Masukkan telur, aduk hingga matang."
    },
    {
      "id": 3,
      "stepNumber": 3,
      "intruction": "Masukkan nasi putih, aduk hingga merata."
    },
    {
      "id": 4,
      "stepNumber": 4,
      "intruction": "Tambahkan kecap manis dan bumbu lainnya, aduk hingga matang."
    }
  ]
}
```

---

## ⚠️ **Error Responses**

Semua endpoint dapat mengembalikan **error response** dalam format berikut:

```json
{
  "errors": "Deskripsi kesalahan"
}
```

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| `400`       | Bad Request (Kesalahan Validasi)         |
| `404`       | Not Found (Data Tidak Ditemukan)         |
| `500`       | Internal Server Error (Kesalahan Server) |

---

🎉 **Selesai!** Dokumentasi ini menjelaskan cara menggunakan API untuk mendapatkan data resep, ingredients, dan steps.
