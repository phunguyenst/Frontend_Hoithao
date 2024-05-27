import styled from "styled-components"
import { useState, useEffect } from "react"
import Member from "./Member"
import EventDataService from "../../services/event.service";


const Members = (props) => {
  const [members, setMembers] = useState([]);
  const [change, setChange] = useState(true)
  const addMember = (e) => {
    if (e.keyCode === 13) {
      const emails = e.target.value.replace(/\s+/g, '').split(',');
      if(emails.length > 1) {
        const invitation = {
          list: emails,
          eventID: props.targetEvent._id,
          role: 0
        }
        EventDataService.invite(invitation).then(response => {
          console.log(response.data);
          setChange(!change)
        }).catch(e => console.log(e));
      }
      else {
        const invitation = {
          email: e.target.value,
          eventID: props.targetEvent._id,
          role: 0
        }
        e.target.value = ''
        EventDataService.invite(invitation).then(response => {
          console.log(response.data);
          props.setGuestIDs(...props.guestIDs, response.data.member[0].mem_id)
          setChange(!change)
        }).catch(e => console.log(e));
      }
    }
  }

  const deleteMember = (member) => { 
    EventDataService.cancelInvitation(member.inv_id, member).then(response => {
      console.log(response.data);
    }).catch(e => console.log(e));
    setMembers(members.filter( mem => mem.inv_id !== member.inv_id))
  }

  const changeRole = (member) => { 
    member.role = !member.role
    EventDataService.changeRole(member.inv_id, {role: member.role}).then(response => {
      console.log(response.data);
    }).catch(e => console.log(e));
    setMembers(members.map( mem => {
      if(mem.mem_id === member.mem_id) {
        return member
      }
      return mem
    }))
  }

  useEffect(() => {
    setMembers([]);
    if(props.targetEvent._id !== undefined) {
      EventDataService.getEventInvitations(props.targetEvent._id).then(response => {
        setMembers(response.data);
        console.log(response.data);
      }).catch(e => console.log(e));
    }
  }, [change, props.targetEvent._id]);

  return (
    <Container>
      <Input className='form-control' 
        type="text" name="searchBar" 
        style={{backgroundColor: 'white'}} 
        id="searchbar" placeholder="Add member" 
        onKeyUp={(e)=>addMember(e)}
        readOnly={!props.isEdit}/>
      <MemberContainer>
        { members.map((member) => <Member
            fName={member.fName ? member.fName : ''}
            lName={member.lName ? member.lName : ''} 
            url={member.url ? member.url : 'logo192.png'}
            relation={''}
            status={member.status}
            key = {member.mem_id}
            role={member.role}
            isEdit={props.isEdit}
            changeRole={() => changeRole(member)}
            onDelete={() => deleteMember(member)}/>)}
      </MemberContainer>
    </Container>
  )

}


const Container = styled.div`
width: 100%;
padding-left:20px;
padding-right: 5px;
overflow-y: scroll;
overflow-x: hidden;
&::-webkit-scrollbar {
  width: 5px;
}
/* Track */
&::-webkit-scrollbar-track {
  background: transparent;
}
/* Handle */
&::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 3px;
}
/* Handle on hover */
&::-webkit-scrollbar-thumb:hover {
  background: #757575;
}
`
const MemberContainer = styled.div`
  margin-top: 15px;
`

const Input = styled.input`
width: 100%;
margin: 5px 0;
border-radius: 5px;
`

export default Members


