import React,{ useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";

import { editFilters } from '../../../store/reducers/jobReducer';
import FilterTag from './FilterTag';
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
    if (typeof value === 'number') return String(value);
    else return value.toLowerCase();
  },[])

  useEffect(() => {
    dispatch(editFilters({[category]: jobFilters}));
  }, [category, dispatch, jobFilters])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    // Filter similar options based on input value
    const filtered = filterOptions.filter(option => (
      parseFilterValue(option).includes(parseFilterValue(value))
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

  const clearFilters = () => {
    setInputValue('');
    setFilteredOptions(filterOptions);
    if(Array.isArray(jobFilters)) setJobFilters([]);
    else setJobFilters('');
  }

  const removeTags = (tag) => {
    const updatedTags = jobFilters.filter(jobFilter => jobFilter !== tag);
    setJobFilters(updatedTags);
  }

  return (
    <div className={styles.filterWrapper}>
      <div className={filterInputWrapperClass}>
        <div className={styles.filterInputSection}>
          {Array.isArray(jobFilters) && (
            jobFilters.map((jobFilter, idx) => (
              <FilterTag key={idx} jobFilter={jobFilter} removeTags={removeTags} />
            ))
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
          {!!jobFilters && (
            <img src={clearIcon} alt="clear" onClick={() => clearFilters()}/>
          )}
          <img src={arrowIcon} onClick={() => setShowDropdown(true)} alt="arrow"/>
        </div>
      </div>

      {showDropdown && (
        <div className={styles.optionContainer}>
          {filteredOptions ? (
            filteredOptions.map((option, index) => (
              <div className={styles.filterOption} key={index}
                onClick={() => handleFilterResult(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className={styles.filterOption}> No Options </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EntityFilter;
