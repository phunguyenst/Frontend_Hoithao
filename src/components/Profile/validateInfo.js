export default function validateInfor(values) {
    let errors = {};

    if (/[<>]/.test(values.TenTaiKhoan)) {
        errors.TenTaiKhoan = 'Tên tài khoản không được chứa các ký tự < hoặc >';
    }
     else if (!/^0[0-9]{9,10}$/.test(values.SoDienThoai)) {
        errors.SoDienThoai = 'Số điện thoại phải bắt đầu bằng số 0 và theo sau là 9 hoặc 10 chữ số.';
    }

    return errors;
}