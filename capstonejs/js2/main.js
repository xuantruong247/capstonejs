import { sanPhamServices } from "./services/sanPhamService.js";
import { sanPhamController } from "./controllers/sanPhamController.js";
import { validator } from "./services/validation.js";

let sanPhamList = [];
let idNewSanPham = null;

//Gắn sự kiện click cho button search
document.getElementById("basic-addon2").addEventListener("click", function () {
  let sanPhamName = document.getElementById("inputTK").value;
  let mangTK = sanPhamController.timKiemSP(sanPhamList, sanPhamName);
  renderTable(mangTK);
});

// thêm nút product vào modal
document.getElementById("btnThemSP").addEventListener("click", function () {
  var footerEle = document.querySelector(".modal-footer");
  footerEle.innerHTML = `
      <button onclick="themSanPham()" class="btn btn-success">Add Product</button>
  `;
});

let renderTable = (list) => {
  let contentHTML = "";
  let count = 1;
  for (let index = 0; index < list.length; index++) {
    let sanPham = list[index];
    let contentTr = `<tr>
        <td>${count}</td>
        <td>${sanPham.name}</td>
        <td>${sanPham.price}</td>
        <td>${sanPham.image}</td>
        <td>${sanPham.description}</td>
        <td class="d-flex">
          <button onclick="xoaSanPham(${sanPham.id})" class="btn btn-danger">Xóa</button>
          <button class="btn btn-primary" onclick="layChiTietSanPham(${sanPham.id})">Sửa</button>
      </tr>`;
    contentHTML = contentHTML + contentTr;
    count++;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};

let renderDanhSachServices = () => {
  sanPhamServices
    .layDanhSachSanPham()
    .then((res) => {
      sanPhamList = res.data;
      renderTable(sanPhamList);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

renderDanhSachServices();

let xoaSanPham = (idSanPham) => {
  sanPhamServices
    .xoaSanPham(idSanPham)
    .then((res) => {
      console.log(res.data);
      renderDanhSachServices(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
window.xoaSanPham = xoaSanPham;

let themSanPham = () => {
  let nVien = sanPhamController.layThongTinTuForm();
  console.log(nVien.name, nVien.price, nVien.image, nVien.desciption);
  let isValid = sanPhamController.validationSp(nVien);
  console.log(isValid);
  if (isValid) {
    sanPhamServices
      .themSanPham(nVien)
      .then((res) => {
        renderDanhSachServices();
        sanPhamController.clearThongTinCuaForm();
        document.querySelector("#myModal .close").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
window.themSanPham = themSanPham;

let layChiTietSanPham = (idSanPham) => {
  idNewSanPham = idSanPham;
  sanPhamServices
    .layChiTietSanPham(idSanPham)
    .then((res) => {
      //Mở modal
      $("#myModal").modal("show");
      let sanPham = res.data;
      console.log(sanPham);
      sanPhamController.showThongTinLenForm(sanPham);
      //Thêm button cập nhật cho form
      document.querySelector(".modal-footer").innerHTML = `
          <button class="btn btn-success" onclick="capNhatSanPham()">Update Product</button>
      `;
    })
    .catch((err) => {
      console.log(err);
    });
};
window.layChiTietSanPham = layChiTietSanPham;

let capNhatSanPham = () => {
  let newSanPham = sanPhamController.layThongTinTuForm();
  newSanPham = { ...newSanPham, id: idNewSanPham };
  let isValid = sanPhamController.validationSp(newSanPham);
  if (isValid) {
    sanPhamServices
      .capNhatSanPham(newSanPham)
      .then((res) => {
        renderDanhSachServices();
        sanPhamController.clearThongTinCuaForm();
        document.querySelector("#myModal .close").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
window.capNhatSanPham = capNhatSanPham;
