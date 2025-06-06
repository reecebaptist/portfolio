import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import LanguageTransition from './LanguageTransition';

const LanguageButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-family:'Helvetica', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  

  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeLanguage = (lng: string) => {
    if (i18n.language === lng) return;

    setIsTransitioning(true);
    setTimeout(() => {
      i18n.changeLanguage(lng);
    }, 500); // Change language mid-animation

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Close overlay after full animation
  };

  return (
    <div>
      <LanguageTransition isVisible={isTransitioning} />
      <LanguageButton 
        onClick={() => changeLanguage('en')}
        style={{ fontWeight: i18n.language === 'en' || i18n.language === 'en-US' ? 'bold' : 'normal' }}
      >
        EN
      </LanguageButton>
      <LanguageButton 
        onClick={() => changeLanguage('ja')}
        style={{ fontWeight: i18n.language === 'ja' ? 'bold' : 'normal' }}
      >
        JP
      </LanguageButton>
    </div>
  );
};

export default LanguageSwitcher;