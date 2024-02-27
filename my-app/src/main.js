const api = "http://localhost:3000/products";
const app = document.querySelector("#app");

const renderProductList = (products) => {
  const html = products.map((product) => {
    return `<tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><img src="${product.image}" width="100" height="100"/></td>
          <td>${product.quantity}</td>
          <td>
            <button class="btn btn-success">Thêm</button>
            <button onclick="productDelete(${product.id})" class="btn btn-danger">Xoá</button>
          </td>
        </tr>`;
  }).join("");

  app.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
   
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Ảnh</th>
          <th>Số lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        ${html}
      </tbody>
    </table>
  `;
};

const viewProductPage = () => {
  fetch(api)
    .then((result) => result.json())
    .then((products) => {
      renderProductList(products);
    });
};

const productDelete = (productId) => {
  const deleteConfirm = confirm("Bạn có muốn xoá không?");

  if (deleteConfirm) {
    fetch(api + "/" + productId, {
      method: "DELETE",
    })
    .then(() => {
      viewProductPage();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while deleting the product');
    });
  }
};

viewProductPage();
