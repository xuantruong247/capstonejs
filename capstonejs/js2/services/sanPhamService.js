
const BASE_URL = "https://62e63f1069bd03090f6dadee.mockapi.io/product";

export let sanPhamServices = {
  layDanhSachSanPham: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  xoaSanPham: (idSanPham) => {
    return axios({
      url: `${BASE_URL}/${idSanPham}`,
      method: "DELETE",
    });
  },
  themSanPham: (sanPham) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: sanPham,
    });
  },
  layChiTietSanPham: (idSanPham) => {
    return axios({
      url: `${BASE_URL}/${idSanPham}`,
      method: "GET",
    });
  },
  capNhatSanPham: (sanPham) => {
    return axios({
      url: `${BASE_URL}/${sanPham.id}`,
      method: "PUT",
      data: sanPham,
    });
  },
  
};
