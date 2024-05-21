interface EmployeeDto {
  [index: string]: string | number

  id: number
  name: string
  date: string
}

type StaffDto = {
  [index: string]: EmployeeDto[]
}

const mockData: StaffDto = {
  programmers: [
    { id: 1, name: 'Tom', date: '2000-01-01', grade: 'junior' },
    { id: 5, name: 'John', date: '2001-02-16', grade: 'junior' },
    { id: 6, name: 'Jane', date: '1999-12-03', grade: 'middle' }
  ],
  managers: [
    { id: 2, name: 'Bob', date: '2003-03-21', department: 'South' },
    { id: 3, name: 'Kate', date: '2000-08-23', department: 'North' },
    { id: 4, name: 'Sam', date: '2001-10-12', department: 'West' }
  ],
  // testers: [
  //   { id: 7, name: 'Joseph', date: '2004-04-03' },
  //   { id: 8, name: 'Jade', date: '2003-12-12' }
  // ]
};

const mockApi = async (): Promise<StaffDto> => new Promise<StaffDto>(resolve => {
  resolve(mockData);
});

export default mockApi;
