import React, { useState, useEffect } from "react";
import "./EditInfo.css";

type EditInfoProp = {
  editOnModal: (e: any) => void;
  userinfo: {
    name: string;
    userid: string;
    email: string;
    phone: string;
    created: string;
  };
};

function EditInfo({ editOnModal, userinfo }: EditInfoProp) {
  const [inputForm, setInputForm] = useState({
    editEmail: "",
    password: "",
    inspect: "",
    editPhone: "",
  });

  const { editEmail, password, inspect, editPhone } = inputForm;
  const { email, phone } = userinfo;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const mobileInputHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // mobile전용 유효성 검사 및 입력제한 로직(출력 예시: 000-0000-0000 숫자로만 입력됨. "-"는 자동입력 됨)
    const { name, value, maxLength } = e.currentTarget;
    let reg = new RegExp("^[0-9]");
    if (reg.test(e.key)) {
      if (value.length === 3 || value.length === 8) {
        setInputForm({ ...inputForm, [name]: value + "-" + e.key });
      } else {
        setInputForm({
          ...inputForm,
          [name]: value.slice(0, maxLength) + e.key,
        });
      }
    }

    if (e.key === "Backspace" && value.length === 9) {
      setInputForm({ ...inputForm, [name]: value.substring(0, 8) });
    } else if (e.key === "Backspace" && value.length === 4) {
      setInputForm({ ...inputForm, [name]: value.substring(0, 3) });
    } else if (e.key === "Backspace") {
      setInputForm({
        ...inputForm,
        [name]: value.substring(0, value.length - 1),
      });
    }
    console.log(e.key);
  };

  return (
    <div className="editinfo">
      <div className="editinfo_modal">
        <div className="editinfo_modal_name">youRang</div>
        <div className="editinfo_modal_form">
          <div className="editinfo_modal_Email">
            <div className="editinfo_modal_Email_title">Email</div>
            <input
              className="editinfo_modal_Email_value"
              name="editEmail"
              onChange={onChange}
              defaultValue={editEmail ? editEmail : email}
            />
          </div>
          <div className="editinfo_modal_phone">
            <div className="editinfo_modal_phone_title">Phone</div>
            <input
              type="text"
              className="editinfo_modal_phone_value"
              name="editPhone"
              value={editPhone}
              onKeyDown={mobileInputHander}
              maxLength={12}
            />
          </div>
          <div className="editinfo_modal_password">
            <div className="editinfo_modal_password_title">Password</div>
            <input
              type="password"
              className="editinfo_modal_password_value1"
              name="password"
              value={password}
              onChange={onChange}
            />
            <input
              className="editinfo_modal_password_value2"
              type="password"
              name="inspect"
              value={inspect}
              onChange={onChange}
            />
            {password !== inspect ? (
              <div className="editinfo_modal_password_inspect">
                작성된 비밀번호가 서로 다릅니다
              </div>
            ) : (
              ""
            )}
          </div>

          <button className="editinfo_modal_btn" onClick={editOnModal}>
            작성완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
