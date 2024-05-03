import React,{ useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";

import { editFilters } from '../../../store/reducers/jobReducer';
import clearIcon from '../../assets/svg/clear.svg';
import arrowIcon from '../../assets/svg/arrow.svg';

import styles from './EntityFilter.module.css';

const EntityFilter = ({filterOptions, inputType, category, placeholder, filterData}) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(filterOptions);
  const [jobFilters, setJobFilters] = useState(filterData);
  const filterInputWrapperClass = `
    ${styles.filterInputWrapper} ${showDropdown && styles.focusInputWrapper}`;
  const dispatch = useDispatch();

  const parseFilterValue = useCallback((value) => {
    if (typeof value === 'number') return value;
    else return value.toLowerCase();
  },[])

  useEffect(() => {
    dispatch(editFilters({[category]: jobFilters}));
  }, [category, dispatch, jobFilters])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    // Filter options based on input value
    const filtered = filterOptions.filter(option => (
      parseFilterValue(option).includes(option.toLowerCase())
    ));
    setFilteredOptions(filtered);
  };

  const handleFilterResult = (option) => {
    if(Array.isArray(jobFilters)) {
      setInputValue('');
      const updatedFilters = [...jobFilters, parseFilterValue(option)];
      setJobFilters(updatedFilters);
    } else {
      setJobFilters(parseFilterValue(option));
      setInputValue(option);
    }
  };

  const removeTags = (tag) => {
    console.log(tag);
    const updatedTags = jobFilters.filter(jobFilter => jobFilter !== tag);
    setJobFilters(updatedTags);
  }

  return (
    <div className={styles.filterWrapper}>
      <div className={filterInputWrapperClass}>
        <div className={styles.filterInputSection}>
          {Array.isArray(jobFilters) && (
            jobFilters.map((jobFilter) => {
              return (
                <div className={styles.filterTag}>
                  <span>{jobFilter}</span>
                  <img src={clearIcon} alt="clear" onClick={() => removeTags(jobFilter)}/>
                </div>
              );
            })
          )}
          <input 
            type={inputType}
            value={inputValue}
            placeholder={placeholder}
            className={styles.filterInput}
            onChange={handleInputChange}
            onClick={() => setShowDropdown((prevState) => !prevState)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            onSubmit={() => handleFilterResult(inputValue)}
          />
        </div>
        <div className={styles.filterActionContainer}>
          {inputValue && (
            <img src={clearIcon} alt="clear" onClick={() => handleFilterResult('')}/>
          )}
          <img src={arrowIcon} alt="arrow"/>
        </div>
      </div>

      {showDropdown && (
        <div className={styles.optionContainer}>
          {filteredOptions.map((option, index) => (
            <div className={styles.filterOption} key={index}
              onClick={() => handleFilterResult(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EntityFilter;
