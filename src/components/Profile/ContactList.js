import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";
import { useEffect } from "react";
import accountService from "../../services/account.service";

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const addContact = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value)
      accountService.updateContacts({email: e.target.value}).then(response => {
        if(response.data.contact) setContacts([...contacts, response.data.contact])
        console.log(response.data)
      }).catch(e => console.log(e))
      e.target.value=''
    }
  }

  const deleteContact = (contact_id) => {
    accountService.updateContacts({contactId: contact_id}).then(response => {
      console.log(response.data)
    }).catch(e => console.log(e))
    setContacts(contacts.filter(contact => contact._id !== contact_id))
  }
  useEffect(() => {
    accountService.getContacts().then(response => {
      setContacts(response.data)
      console.log(response.data)
  }).catch(e => console.log(e))
  }, [])
  return (
    <ListContainer>
      <Input className='form-control' type="text" name="searchBar" id="searchbar" placeholder="Thêm liên lạc mới" onKeyUp={(e) => addContact(e)} />
      <Wrapper>
        {contacts.map((contact) =>
          <Container key={contact._id} className="row">
            <Title className="col-md-4"> {`${contact.fName} ${contact.lName}`} </Title>
            <Infor className="col-md-4"> Email: {contact.email} </Infor>
            <Infor className="col-md-3" style={{marginRight:'50px'}}> Phone: {contact.phone} </Infor>
            <div className="col-md" style={{fontSize: '20px', marginTop:'3px'}}>
              <TiDeleteOutline onClick={() => deleteContact(contact._id)} />
            </div>
          </Container>
        )}
      </Wrapper>
    </ListContainer>
  )
}


const Container = styled.div`
height: 45px;
width: 80%;
background-color: #f9f9f9;
margin: 5px;
border: 1px solid #d0d7de;
border-radius: 5px;
}`

const Title = styled.div`
  color: black;
  font-size: 125%;
  font-weight: 600 !important;
  margin-right:-30px;
  padding: 5px 10px;
`;

const ListContainer = styled.div`
background-color: #fff;
width: 1100px;
height: 100%;
top: 50%;
padding-left: 12px;
overflow-y: scroll;
margin-bottom: 100px;
`


const Infor = styled.span`
font-weight: 490;
padding: 9px 10px;
`

const Input = styled.input`
width: 80%;
margin: 10px 5px;
border-radius: 5px;
`
const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
`
export default ContactList