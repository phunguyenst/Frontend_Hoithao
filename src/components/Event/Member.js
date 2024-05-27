import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

const fontSize = {
  'font-size': '10px',
  'font-weight': '300'
}

const P = styled.p`
font-size : 15px;
margin-top: -5px;
margin-bottom: 5px;
font-weight: 500;
`

const MemContainer = styled.div`
width: 100%;
margin: 5px 0;
justify-content: space-between;
`
const Contain = styled.div``

const Logo = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 5px;
`;

const Label = styled.span`
margin-left: 5px;
border-radius: 5px;
padding: 5px 10px;
background-color: #FFF1E7;
font-size: 10px;
color: #F77307;
text-align: center;
font-weight: 700;
`
const Select = styled.select`
  border-radius: 5px;
  font-size: 15px;
  font-family: Roboto;
  padding: 3px;
  border: 1px solid #dedede;
  outline: none;
  width: fit-content;
`;
const Member = (props) => {
  const Avatar = () => (<Logo src={props.url} alt="avatar" />)

  function Name() {
    if (props.relation !== '') { return <P>{`${props.fName ? props.fName : 'Noname'} ${props.lName ? props.lName : ''}`}</P>; }
    else return <P style={{ marginTop: '3px' }}>{`${props.fName ? props.fName : 'Noname'} ${props.lName ? props.lName : ''}`}</P>;
  }

  const Userrole = () => (
      <Select name="role" className='col-md-3' value={props.role} onChange={props.changeRole} disabled={props.isEdit ? false : true }>
        <option value={true}> Chỉnh sửa</option>
        <option value={false}> Chỉ xem</option>
      </Select>
  )

  function Userstatus() {
    if (props.status === 'Đã đồng ý') {
      return <Label style={{ backgroundColor: '#D0EFDB', color: '#10944D' }}>
        {props.status}
      </Label>;
    }
    else if (props.status === 'Từ chối') {
      return <Label style={{ backgroundColor: '#FF6666', color: '	#990000' }}>
        {props.status} </Label>;
    }
    else return <Label> {props.status} </Label>;
  }

  const IsFriend = () => (
    <P style={fontSize}> {props.relation} </P>
  )



  return (
    <MemContainer className='d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center col-md-6'>
        <Avatar />
        <Contain>
          <Name />
          <IsFriend />
        </Contain>
      </div>
      <Userrole />
      <div className='d-flex align-items-center col-md-3 justify-content-between'>
        <Userstatus />
        <TiDeleteOutline display={props.isEdit ? '' : 'none'} onClick={props.onDelete} style={{fontSize: '20px', textAlign:"right"}}/>
      </div>
    </MemContainer>
  )
}

export default Member