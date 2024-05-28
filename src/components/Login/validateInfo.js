export default function validateInfo(values) {
    let errors = {};
  
    if (!values.TenTaiKhoan.trim()) {
      errors.TenTaiKhoan = 'Bạn chưa nhập tài khoản ';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Bạn chưa nhập email';
    } 
    else if (!/^[\w-]+(\.[\w-]+)*@gmail\.com$/.test(values.email)) {
      errors.email = 'Email không hợp lệ. Định dạng email là name@gmail.com';
    }
    if (!values.password) {
      errors.password = 'Bạn chưa nhập mật khẩu';
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(values.password)) {
      errors.password = 'Password sử dụng tối thiểu 8 ký tự, và tối đa 15 ký tự. Bao gồm số, chữ thường, chữ in hoa và ký tự đặc biệt.';
  }
    if (!values.password2) {
      errors.password2 = 'Bạn chưa nhập mật khẩu';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Mật khẩu không trùng khớp';
    }
    return errors;
  }