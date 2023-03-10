let inforTour = document.querySelector(".inforTour");
let diaDiem = document.querySelector(".diaDiem");
let giaVe = document.querySelector(".giaVe");
let gioThieu = document.querySelector(".gioThieu");
let giaCu = document.querySelector(".giaCu");
let ngayXuatPhat = document.querySelector(".ngayXuatPhat");
let soLuong = document.querySelector(".soLuong");
let daDat = document.querySelector(".daDat");
let phuongTien = document.querySelector(".phuongTien");
let tieuChuan = document.querySelector(".tieuChuan");
let imgsTour = document.querySelector(".imgsTour");
let soNgay = document.querySelector(".soNgay");
let btn = document.querySelector(".submit");
let days = 0;
let flag = "";

function addInforPlace() {
    days = soNgay.value;
    if (days > 0) {
        for (let i = 1; i <= days; i++) {
            flag += `
                    <input type="text" placeholder="địa điểm của ngày${i}" class="day ngay${i}" />
                    <input type="text" placeholder="hình ảnh của ngày ${i}" class="day imgNgay${i}" />
                    <input type="text" placeholder="giới thiệu của ngày ${i}" class="day gthieuNgay${i}" />
                `;
        }
        inforTour.innerHTML = flag;
        flag = "";
    }
}

function setDataValue() {
    let tieuChuanValue = tieuChuan.value;
    let imgsTourValue = imgsTour.value;
    let arrayTieuChuan = tieuChuanValue.split("\n");
    let arraysImgsTour = imgsTourValue.split("\n");
    let obj = {
        diaDiem: diaDiem.value,
        giaVe: giaVe.value,
        gioThieu: gioThieu.value,
        giaCu: giaCu.value,
        ngayXuatPhat: ngayXuatPhat.value,
        soLuong: soLuong.value,
        daDat: daDat.value,
        phuongTien: phuongTien.value,
        soNgay: soNgay.value,
        tieuChuan: arrayTieuChuan,
        imgsTour: arraysImgsTour,
        chuongTrinh: [],
    };
    if (days > 0) {
        for (let index = 1; index <= days; index++) {
            let ngay = document.querySelector(`.ngay${index}`);
            let imgNgay = document.querySelector(`.imgNgay${index}`);
            let gthieuNgay = document.querySelector(`.gthieuNgay${index}`);
            let objFlag = {
                viTri: ngay.value,
                imgNgay: imgNgay.value,
                gthieuNgay: gthieuNgay.value,
            };
            obj.chuongTrinh.push(objFlag);
            pushDataToServer(obj);
            obj = {}
        }
    }
}

function pushDataToServer(obj) {
    let data = JSON.stringify(obj);
    fetch("https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
        .then(() => {
            alert("đã thêm dữ liệu !");
            diaDiem.value = "";
            giaVe.value = "";
            gioThieu.value = "";
            giaCu.value = "";
            ngayXuatPhat.value = "";
            soLuong.value = "";
            daDat.value = "";
            soNgay.value = "";
            tieuChuan.value = "";
            imgsTour.value = "";
            inforTour.innerHTML = "";
            setTimeout(() => {
                document.body.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 1000);
        })
        .catch(() => {
            alert("chưa update dữ liệu được");
        });
}

soNgay.onblur = () => addInforPlace();
btn.onclick = () => setDataValue();
