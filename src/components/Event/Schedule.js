import { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import Button from "./Button";
import SchedTable from "./SchedTable"

const Label = styled.label`
	font-weight: 600;
`;

const TimeInterval = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

const Control = styled(Form.Control)`
  padding: 2px 8px;
`;
const Detail = styled.div`
	width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
	box-sizing: border-box;
	padding-left: 20px;
  padding-right: 5px;

	padding-bottom: 5px;
	overflow-y: scroll;
`;
const Schedule = () => {
  const [fromDate, setfromDate] = useState(Date)
  const [toDate, settoDate] = useState(Date)
  const [fromTime, setfromTime] = useState(Date)
  const [toTime, settoTime] = useState(Date)

  const [f_d, setF_d] = useState(Date)
  const [t_d, setT_d] = useState(Date)
  const [f_t, setF_t] = useState(Date)
  const [t_t, setT_t] = useState(Date)

  const totalMem = 10;
  const data = [{
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 18:00': [],
    '18:00 - 18:30': [ 'Job', 'William', 'Alice', 'Colby' ],
    '18:30 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 18:00': [],
    '18:00 - 18:30': [ 'Job', 'William', 'Alice', 'Colby' ],
    '18:30 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },{
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 18:00': [],
    '18:00 - 18:30': [ 'Job', 'William', 'Alice', 'Colby' ],
    '18:30 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },{
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 18:00': [],
    '18:00 - 18:30': [ 'Job', 'William', 'Alice', 'Colby' ],
    '18:30 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 17:00': [ 'Job', 'William' ],
    '17:00 - 19:00': [],
    '19:00 - 20:00': [ 'Job', 'William', 'Alice', 'Colby' ],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  },
  {
    '16:00 - 16:30': [ 'Job', 'William' ],
    '16:30 - 20:00': [],
    '20:00 - 24:00': [ 'Job', 'William', 'Alice', 'Colby' ]
  }]

  const onFilter = () => {
    setF_d(fromDate)
    setT_d(toDate)
    setF_t(fromTime)
    setT_t(toTime)
  }

  return (
    <>
      <Detail>
        <TimeInterval>
          <Form.Group style={{ width: '48%' }}>
            <Label>Từ ngày</Label>
            <Control type="date" id="from-date" onChange={e => setfromDate(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ width: '48%' }}>
            <Label>Đến ngày</Label>
            <Control type="date" id="to-date" onChange={e => settoDate(e.target.value)}/>
          </Form.Group>
        </TimeInterval>
        <TimeInterval>
          <Form.Group style={{ width: '48%' }}>
            <Label>Không sớm hơn</Label>
            <Control type="time" onChange={e => setfromTime(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ width: '48%' }}>
            <Label>Không trễ hơn</Label>
            <Control type="time" onChange={e => settoTime(e.target.value)}/>
          </Form.Group>
        </TimeInterval>
        <b>Thời gian rảnh của các thành viên</b>
        <SchedTable fromDate={f_d} toDate={t_d} fromTime={f_t} toTime={t_t} data={data} totalMem={totalMem}/>
        <Button buttonStyle="btn-primary" buttonSize="btn-sm" text="Lọc" onClick={onFilter}/>
      </Detail>
    </>
  )
}

export default Schedule