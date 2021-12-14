import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * Context
 */

type MyInfoType = {
  id: string;
  name: string;
};

const MyInfoStateContext = createContext<MyInfoType | undefined>(undefined);
const MyInfoDispatchContext =
  createContext<(myInfo: MyInfoType) => void | undefined>(undefined);

const useMyInfoState = () => {
  const context = useContext(MyInfoStateContext);

  if (context === undefined) {
    throw new Error('useMyInfoState must be inside a Provider with a value');
  }

  return context;
};

const useMyInfoDispatch = () => {
  const context = useContext(MyInfoDispatchContext);

  if (context === undefined) {
    throw new Error('useMyInfoState must be inside a Provider with a value');
  }

  return context;
};

/**
 * Provider
 */

type MyInfoProps = {
  children: ReactNode;
};

export const MyInfoProvider = ({ children }: MyInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myInfo, setMyInfo] = useState<MyInfoType | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);

    setMyInfo({ id: 'xxxyyyzzz', name: 'John' });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MyInfoStateContext.Provider value={myInfo}>
      <MyInfoDispatchContext.Provider value={setMyInfo}>
        {children}
      </MyInfoDispatchContext.Provider>
    </MyInfoStateContext.Provider>
  );
};
