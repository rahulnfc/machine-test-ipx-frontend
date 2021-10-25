import { ErrorMessage, useField } from 'formik'
import styled from 'styled-components'

const Label = styled.label`
    text-align: left;
    margin-bottom: 0.5rem;
`;
const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
`;
const Input = styled.input`
    border: 0;
    outline: 0;
    background-color: transparent;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #fff;
    font-weight: bolder;
    width: 100%;
    border-radius: 10px;
`;

const Error = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-bottom: 1rem;
`;


const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Label htmlFor={field.name}>{label}</Label>
      <InputContainer>
        <Input {...field} {...props} />
      </InputContainer>
      {meta.touched && meta.error ? ( <ErrorMessage name={field.name} component={Error} /> ) : null}
    </>
  );
}

export default InputField