import HomeLineIcon from './../assets/tabIcon/homeIconLine.svg';
import HomeFillIcon from './../assets/tabIcon/homeIconFill.svg';
import GraphLineIcon from './../assets/tabIcon/graphIconLine.svg';
import GraphFillIcon from './../assets/tabIcon/graphIconFill.svg';
import MyLineIcon from './../assets/tabIcon/myIconLine.svg';
import MyFillIcon from './../assets/tabIcon/myIconFill.svg';
import MoreLineIcon from './../assets/tabIcon/menuIconLine.svg';
import MoreFillIcon from './../assets/tabIcon/menuIconFill.svg';

export function genTabIcon({
  focused,
  name,
}: {
  focused: boolean;
  color: string;
  size: number;
  name: 'Home' | 'Graph' | 'Profile' | 'More';
}) {
  switch (name) {
    case 'Home':
      return focused ? <HomeFillIcon /> : <HomeLineIcon />;
    case 'Graph':
      return focused ? <GraphFillIcon /> : <GraphLineIcon />;
    case 'Profile':
      return focused ? <MyFillIcon /> : <MyLineIcon />;
    case 'More':
      return focused ? <MoreFillIcon /> : <MoreLineIcon />;
  }
}
