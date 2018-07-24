const initialState = {
  userId: '1',
  name: 'chad_kruger',
  profPic:
    'https://images.pexels.com/photos/144428/pexels-photo-144428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  description: 'Hey, I play guitar and sing for a rockband'
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
