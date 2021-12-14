import { MyButton } from './components/MyButton';

export const App = () => {
  const handleButtonClick = () => {
    alert('Clicked!');
  };

  return (
    <div>
      <MyButton onClick={handleButtonClick}>Button!!</MyButton>
    </div>
  );
};
