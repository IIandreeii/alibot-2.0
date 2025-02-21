import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from 'services/auth/login.service';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useChatContext } from 'pages/chat/context/chat';
import { auth, googleProvider } from '../../../libs/firebase';
import { signInWithPopup } from 'firebase/auth';

interface LoginFormInputs {
  username: string;
  password: string;
}

const primaryColor = '#25D366'; 
const secondaryColor = '#128C7E'; 
const backgroundColor = '#ECE5DD'; 

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #000000;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  @media (max-width: 900px) {
  display: none;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://example.com/background-image.jpg');
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 16px;
    text-align: center;
    text-shadow: rgb(34 122 67) 5px 2px 0px;
    font-weight: 700;
  }

  p {
    font-size: 18px;
    max-width: 300px;
    text-align: center;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: url(/download.png);
  background-position: center;
  background-size: cover;
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  button {
    &:hover {
    background: #19151f75;
    }
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: white;
`;

const Subtitle = styled.p`
  margin-bottom: 32px;
  color: white;
  text-align: center;
`;

const InputField = styled.div`
  margin-bottom: 16px;
  position: relative;
  color: white;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background: #1d0041df;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #1d0041df;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${secondaryColor};
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  background-color: #db4437;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c33d2e;
  }
`;

const LoginLink = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 16px;

  i {
    margin-right: 5px;
  }

  a {
    color: #100122;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormInputs>({ mode: 'onChange' });
  const toast: any = useRef(null);
  const navigate = useNavigate(); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { setChatSelected, setNumberSelected } = useChatContext();

  const { postLogin, getResponse, loader } = useLogin();

  const onSubmit = async (data: LoginFormInputs) => {
    setShowToast(false);
    setNumberSelected('0');
    setChatSelected(null);

    const response = await postLogin(data); 
    setShowToast(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Mostrar los datos del usuario autenticado
      console.log('Usuario autenticado:', user);
      console.log('Nombre:', user.displayName);
      console.log('Correo electrónico:', user.email);
      console.log('Foto URL:', user.photoURL);
      // Manejar el usuario autenticado
      navigate('/init');
    } catch (error) {
      console.error('Error de autenticación con Google:', error);
      if (toast) {
        toast?.current?.show({
          severity: 'error',
          summary: 'Error de autenticación',
          detail: 'No se pudo iniciar sesión con Google.',
          life: 3000,
        });
      }
    }
  };

  useEffect(() => {
    if (getResponse && getResponse?.statusCode === 401) {
      if (showToast) {
        showError();
      }
    } else {
      if (getResponse) {
        navigate('/init');
      }
    }
  }, [loader, getResponse]);

  const showError = () => {
    if (toast) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Credenciales Incorrectas',
        detail: 'El usuario o la contraseña son incorrectos.',
        life: 3000,
      });
    }
  };

  return (
    <PageContainer>
      <Toast ref={toast} />

      <LeftPanel>
        <img src="/assets/logo_primary.png" alt="Logo AliBot" />
      </LeftPanel>

      <RightPanel>
        <FormContainer>
          <Title>Iniciar sesión</Title>
          <Subtitle>Ingresa tus credenciales para acceder al panel de Alibot.</Subtitle>

          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField>
              <Label htmlFor="username">Correo electrónico</Label>
              <Input
                id="username"
                type="email"
                {...register('username', { required: 'Este campo es obligatorio' })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </InputField>

            <InputField>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                {...register('password', { required: 'Este campo es obligatorio' })}
              />
              {errors.password && <span>{errors.password.message}</span>}
              <button
                type="button"
                className="showPassword"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '70%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <i className={`pi ${passwordVisible ? 'pi-eye-slash' : 'pi-eye'}`} style={{ color: 'white'}}></i>
              </button>
            </InputField>

            <SubmitButton type="submit" disabled={!isValid || loader.loading}>
              {loader.loading ? 'Cargando...' : 'Ingresar'}
            </SubmitButton>
          </form>

          <GoogleButton onClick={handleGoogleLogin}>
            Iniciar sesión con Google
          </GoogleButton>

          <LoginLink>
            <Link to="/"><i className="pi pi-arrow-left"></i> Volver</Link>
          </LoginLink>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default LoginForm;