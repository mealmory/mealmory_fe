import HomeLineIcon from './../assets/tabIcon/homeLine.svg';
import HomeFillIcon from './../assets/tabIcon/homeFill.svg';
import GraphLineIcon from './../assets/tabIcon/graphLine.svg';
import GraphFillIcon from './../assets/tabIcon/graphFill.svg';
import MyLineIcon from './../assets/tabIcon/myLine.svg';
import MyFillIcon from './../assets/tabIcon/myFill.svg';
import MoreLineIcon from './../assets/tabIcon/menuLine.svg';
import MoreFillIcon from './../assets/tabIcon/menuFill.svg';

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
