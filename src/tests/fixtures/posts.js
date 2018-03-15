import moment from 'moment'

export default [{
  id: '1',
  title: 'Gum',
  author: 'thisismytestname',
  body: "Gum is rubbery",
  isReadable: false,
  createdAt: 0,
  uid: 'thisismytestuid',
}, {
  id: '2',
  title: 'Rent',
  author: 'thisismytestname',
  body: "Rent is expensive",
  isReadable: true,
  createdAt: moment(0).subtract(4, 'days').valueOf(),
  uid: 'thisismytestuid',
}, {
  id: '3',
  title: 'Credit Card',
  author: 'thisismytestname',
  body: "Credit cards are thin",
  isReadable: false,
  createdAt: moment(0).add(4, 'days').valueOf(),
  uid: 'thisismytestuid'
}];
