import { SanPham } from "../models/sanPhamModel.js";
import { validator } from "../services/validation.js";

export let sanPhamController = {
  layThongTinTuForm: () => {
    let tenSp = document.getElementById("TenSP").value;
    let giaSp = document.getElementById("GiaSP").value;
    let hinhSp = document.getElementById("HinhSP").value;
    let moTa = document.getElementById("MoTa").value;
    let sanPham = new SanPham(tenSp, giaSp, hinhSp, moTa);
    return sanPham;
  },
  showThongTinLenForm: (sanPham) => {
    document.getElementById("TenSP").value = sanPham.name;
    document.getElementById("GiaSP").value = sanPham.price;
    document.getElementById("HinhSP").value = sanPham.image;
    document.getElementById("MoTa").value = sanPham.description;
  },
  clearThongTinCuaForm: () => {
    document.getElementById("TenSP").value = "";
    document.getElementById("GiaSP").value = "";
    document.getElementById("HinhSP").value = "";
    document.getElementById("MoTa").value = "";
  },
  timKiemSP: (mangSP, chuoiTK) => {
    let mangTK = [];
    mangTK = mangSP.filter(function (sp) {
      return sp.name.toLowerCase().indexOf(chuoiTK.toLowerCase()) >= 0;
    });
    return mangTK;
  },
  validationSp: (nVien) => {
    let isValid = true;
    // Kiểm tra rỗng
    isValid &=
      validator.kiemTraRong(
        nVien.name,
        "TenSpErr",
        "Tên sản phẩm không được để rỗng"
      ) &
      validator.kiemTraRong(
        nVien.price,
        "GiaSpErr",
        "Giá sản phẩm không được để rỗng"
      ) &
      validator.kiemTraRong(
        nVien.image,
        "HinhSpErr",
        "Hình ảnh sản phẩm không được để rỗng"
      ) &
      validator.kiemTraRong(
        nVien.desciption,
        "MoTaErr",
        "Mô tà không được để rỗng"
      );
    // Kiểm tra kí tự
    isValid =
      isValid &&
      validator.kiemTraTatCaCacKiTu(nVien.name, "#TenSpErr", "Tên sản phẩm");

    // Kiểm tra số
    isValid =
      isValid && validator.kiemTraSo(nVien.price, "#GiaSpErr", "Giá sản phẩm");
    // Kiểm tra link url hình ảnh
    isValid =
      isValid &&
      validator.kiemTraUrl(nVien.image, "#HinhSpErr", "Hình sản phẩm");

    console.log("isValid: ", isValid);
    return isValid;
  },
};
