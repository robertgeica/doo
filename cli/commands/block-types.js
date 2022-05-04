const simpleBlockOptions = [
  {name: 'Simple block'} 
];
const complexBlockOptions = [
  {name: 'Complex block'} 
];

const taskBlockOptions = [
  {name: 'priority'}, {name: 'estimation'}, 
]
// *user: priority, estimation, 
// *default: description, status, deadline, isRecurrent, isArchived, sessionsTotalTime
// *arrays: labels, sessions, milestones, blocks


  
module.exports = {
  simpleBlockOptions,
  complexBlockOptions,
  taskBlockOptions
};