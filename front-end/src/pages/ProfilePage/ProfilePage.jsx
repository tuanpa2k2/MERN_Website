import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoLock, GoUnlock } from "react-icons/go";
import { BsPencilSquare, BsPhone } from "react-icons/bs";
import { AiOutlineMail, AiOutlineCloudUpload } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";

import * as message from "../../components/MessageComp/MessageComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

import "./ProfilePage.scss";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { getBase64 } from "../../until";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // lấy user trong redux-store
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPassword(user?.password);
    setAddress(user?.address);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
  }, [user]);

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const { isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      handleUpdateGetDetailsUser(user?.id, user?.access_token);
      message.success("Cập nhập thành công!");
    } else if (isError) {
      message.error("Cập nhập thất bại, vui lòng kiểm tra lại!");
    }
  }, [isSuccess, isError]);

  const handleUpdateGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setAvatar(file.preview);
  };

  const handleUpdateUser = () => {
    mutation.mutate({ id: user?.id, name, email, password, phone, address, avatar, access_token: user?.access_token });
  };

  return (
    <div className="wapper-profilePage">
      <div className="header-profile">👨‍🎓 Thông Tin Người Dùng 👨‍🎓 </div>
      <LoadingComponent isLoading={isLoading}>
        <div className="content-profile">
          <div className="left">
            <div className="img">{avatar && <img src={avatar} alt="avatar" />}</div>
            <Upload onChange={handleOnchangeAvatar} maxCount={1} className="upload-file">
              <Button className="btn-chooseFile" icon={<AiOutlineCloudUpload />}>
                Chọn file ảnh của bạn
              </Button>
            </Upload>
          </div>
          <div className="right">
            <div className="imput-form">
              <div className="label">Họ và tên</div>
              <span className="icon">
                <BsPencilSquare />
              </span>
              <input type="text" placeholder={name} onChange={handleOnchangeName} />
            </div>
            <div className="imput-form">
              <div className="label">Email</div>
              <span className="icon">
                <AiOutlineMail />
              </span>
              <input type="email" placeholder={email} onChange={handleOnchangeEmail} />
            </div>
            <div className="imput-form">
              <div className="label">Mật khẩu</div>
              <span className="icon" onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? <GoUnlock /> : <GoLock />}
              </span>
              <input type="password" placeholder={password} onChange={handleOnchangePassword} />
            </div>
            <div className="imput-form">
              <div className="label">Số điện thoại</div>
              <span className="icon">
                <BsPhone />
              </span>
              <input type="text" placeholder={phone} onChange={handleOnchangePhone} />
            </div>
            <div className="imput-form">
              <div className="label">Địa chỉ</div>
              <span className="icon">
                <SlLocationPin />
              </span>
              <input type="text" placeholder={address} onChange={handleOnchangeAddress} />
            </div>
            <button onClick={handleUpdateUser}>
              <p>Cập nhập thông tin</p>
            </button>
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
};

export default ProfilePage;
