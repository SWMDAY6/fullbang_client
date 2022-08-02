import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const Calendar = ({ start, end, handleDateChange }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <SearchBox>
      <IconBox>{/* <FontAwesomeIcon icon={faCalendar} /> */}</IconBox>
      <DatePickerWrapper>
        <DateRangePicker
          startDatePlaceholderText="체크인"
          endDatePlaceholderText="체크아웃"
          startDate={start}
          startDateId="your_unique_start_date_id"
          endDate={end}
          endDateId="your_unique_end_date_id"
          onDatesChange={handleDateChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          showClearDates={true}
          displayFormat={() => 'YYYY-MM-DD'}
        />
      </DatePickerWrapper>
    </SearchBox>
  );
};

export default Calendar;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 380px;
  height: 60px;
  margin-right: 15px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 5px;
  font-size: 20px;
  padding-left: 15px;
  cursor: pointer;
  span {
    display: inline-block;
    width: 220px;
    font-size: 20px;
    color: ${({ theme }) => theme.middleGray};
  }
  &:hover {
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

const IconBox = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.mainColor};
`;

const DatePickerWrapper = styled.div`
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }

  .CalendarDay {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 13px;
    text-align: center;
  }

  .CalendarDay__default {
    border: none;
    border-radius: 50%;
    vertical-align: middle;
    outline: none;
  }
  .CalendarDay__default:hover {
    background: transparent;
    outline: none;
    border: none;
    color: inherit;
  }
  .CalendarDay__hovered_offset {
    background: #f4f5f5;
    border: 1px double #e4e7e7;
    color: inherit;
  }
  .CalendarDay__outside {
    border: 0;
    background: #fff;
    color: #484848;
  }

  .CalendarDay__blocked_minimum_nights {
    background: #fff;
    border: 1px solid #eceeee;
    color: #cacccd;
  }
  .CalendarDay__blocked_minimum_nights:active,
  .CalendarDay__blocked_minimum_nights:hover {
    background: #fff;
    color: #cacccd;
  }
  .CalendarDay__highlighted_calendar {
    background: #ffe8bc;
    color: #484848;
  }
  .CalendarDay__highlighted_calendar:active,
  .CalendarDay__highlighted_calendar:hover {
    background: #ffce71;
    color: #484848;
  }
  .CalendarDay__selected_span {
    background: #fb0552;
    border: none;
    color: #fff;
  }
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    background: #ffd4e3;
    border: none;
    color: #fff;
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: #fb0552;
    border: none;
    color: #fff;
  }
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    background: #f7f7f7;
    border: none;
    color: black;
  }
  .CalendarDay__hovered_span:active {
    background: #ffa8c3;
    border: none;
    color: #eebdcc;
  }
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: #fed4e3;
    border: none;
    color: #82888a;
  }
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    border: none;
    color: #cacccd;
  }
  .CalendarDay__hovered_start_first_possible_end {
    background: #eceeee;
    border: none;
  }
  .CalendarDay__hovered_start_blocked_min_nights {
    background: #eceeee;
    border: none;
  }
  .CalendarMonth {
    background: #fff;
    text-align: center;
    vertical-align: top;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .CalendarMonth_table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .CalendarMonth_verticalSpacing {
    border-collapse: separate;
  }
  .CalendarMonth_caption {
    color: #484848;
    font-size: 18px;
    text-align: center;
    padding-top: 22px;
    padding-bottom: 37px;
    caption-side: initial;
    margin-bottom: 10px;
  }
  .CalendarMonth_caption__verticalScrollable {
    padding-top: 12px;
    padding-bottom: 7px;
  }
  .CalendarMonthGrid {
    background: #fff;
    text-align: left;
    z-index: 0;
  }
  .CalendarMonthGrid__animating {
    z-index: 1;
  }
  .CalendarMonthGrid__horizontal {
    position: absolute;
    left: 9px;
  }
  .CalendarMonthGrid__vertical,
  .CalendarMonthGrid__vertical_scrollable {
    margin: 0 auto;
  }
  .CalendarMonthGrid_month__horizontal {
    display: inline-block;
    vertical-align: top;
    min-height: 100%;
  }
  .CalendarMonthGrid_month__hideForAnimation {
    position: absolute;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
  }
  .CalendarMonthGrid_month__hidden {
    visibility: hidden;
  }
  .DayPickerNavigation {
    position: relative;
    z-index: 2;
  }
  .DayPickerNavigation__horizontal {
    height: 0;
  }
  .DayPickerNavigation__verticalScrollable_prevNav {
    z-index: 1;
  }
  .DayPickerNavigation__verticalDefault {
    position: absolute;
    width: 100%;
    height: 52px;
    bottom: 0;
    left: 0;
  }
  .DayPickerNavigation__verticalScrollableDefault {
    position: relative;
  }
  .DayPickerNavigation__bottom {
    height: auto;
  }
  .DayPickerNavigation__bottomDefault {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .DayPickerNavigation_button {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 0;
    padding: 0;
    margin: 0;
  }
  .DayPickerNavigation_button__default {
    border: 1px solid #e4e7e7;
    background-color: #fff;
    color: #757575;
  }
  .DayPickerNavigation_button__default:focus,
  .DayPickerNavigation_button__default:hover {
    border: 1px solid #c4c4c4;
  }
  .DayPickerNavigation_button__default:active {
    background: #fff;
  }
  .DayPickerNavigation_button__disabled {
    cursor: default;
    border: 1px solid #f2f2f2;
  }
  .DayPickerNavigation_button__disabled:focus,
  .DayPickerNavigation_button__disabled:hover {
    border: 1px solid #f2f2f2;
  }
  .DayPickerNavigation_button__disabled:active {
    background: 0 0;
  }
  .DayPickerNavigation_button__horizontalDefault {
    position: absolute;
    top: 18px;
    line-height: 0.78;
    border-radius: 3px;
    padding: 6px 9px;
  }
  .DayPickerNavigation_bottomButton__horizontalDefault {
    position: static;
    margin: -10px 22px 30px;
  }
  .DayPickerNavigation_leftButton__horizontalDefault {
    left: 22px;
  }
  .DayPickerNavigation_rightButton__horizontalDefault {
    right: 22px;
  }
  .DayPickerNavigation_button__verticalDefault {
    padding: 5px;
    background: #fff;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    display: inline-block;
    text-align: center;
    height: 100%;
    width: 50%;
  }
  .DayPickerNavigation_nextButton__verticalDefault {
    border-left: 0;
  }
  .DayPickerNavigation_nextButton__verticalScrollableDefault,
  .DayPickerNavigation_prevButton__verticalScrollableDefault {
    width: 100%;
  }
  .DayPickerNavigation_svg__horizontal {
    height: 19px;
    width: 19px;
    fill: #82888a;
    display: block;
  }
  .DayPickerNavigation_svg__vertical {
    height: 42px;
    width: 42px;
    fill: #484848;
  }
  .DayPickerNavigation_svg__disabled {
    fill: #f2f2f2;
  }
  .DayPicker {
    background: #fff;
    position: relative;
    text-align: left;
  }
  .DayPicker__horizontal {
    background: #fff;
  }
  .DayPicker__verticalScrollable {
    height: 100%;
  }
  .DayPicker__hidden {
    visibility: hidden;
  }
  .DayPicker__withBorder {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07);
    border-radius: 3px;
  }
  .DayPicker_portal__horizontal {
    box-shadow: none;
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .DayPicker_portal__vertical {
    position: initial;
  }
  .DayPicker_focusRegion {
    outline: 0;
  }
  .DayPicker_calendarInfo__horizontal,
  .DayPicker_wrapper__horizontal {
    display: inline-block;
    vertical-align: top;
  }
  .DayPicker_weekHeaders {
    position: relative;
  }
  .DayPicker_weekHeaders__horizontal {
    margin-left: 9px;
  }
  .DayPicker_weekHeader {
    color: #fff;
    position: absolute;
    top: 62px;
    z-index: 2;
    text-align: left;
  }
  .DayPicker_weekHeader__vertical {
    left: 50%;
  }
  .DayPicker_weekHeader__verticalScrollable {
    top: 0;
    display: table-row;
    border-bottom: 1px solid #dbdbdb;
    background: #fff;
    margin-left: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .DayPicker_weekHeader_ul {
    list-style: none;
    margin: 1px 0;
    padding-left: 0;
    padding-right: 0;
    font-size: 14px;
  }
  .DayPicker_weekHeader_li {
    display: inline-block;
    text-align: center;
  }
  .DayPicker_transitionContainer {
    position: relative;
    overflow: hidden;
    border-radius: 3px;
  }
  .DayPicker_transitionContainer__horizontal {
    -webkit-transition: height 0.2s ease-in-out;
    -moz-transition: height 0.2s ease-in-out;
    transition: height 0.2s ease-in-out;
  }
  .DayPicker_transitionContainer__vertical {
    width: 100%;
  }
  .DayPicker_transitionContainer__verticalScrollable {
    padding-top: 20px;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: scroll;
  }
  .DateInput {
    background: #fff;
    width: 134px;
  }
  .DateInput__small {
    width: 97px;
  }
  .DateInput__block {
    width: 90%;
  }
  .DateInput__disabled {
    background: #f2f2f2;
    color: #dbdbdb;
    border: 0;
  }
  .DateInput_input {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: rgb(52, 58, 64);
    background-color: #fff;
    outline: none;
    width: 200px;
    padding: 10px 0;
  }
  ::-webkit-input-placeholder {
    color: rgb(52, 58, 64);
  }
  .DateInput_input__small {
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;
    padding: 7px 7px 5px;
  }
  .DateInput_input__regular {
    font-weight: auto;
  }
  .DateInput_input__readOnly {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .DateInput_input__focused {
    outline: 0;
    background-color: #fff;
    border: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
  }
  .DateInput_input__disabled {
    background: #f2f2f2;
    font-style: italic;
  }
  .DateInput_screenReaderMessage {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  .DateInput_fang {
    position: absolute;
    width: 20px;
    height: 10px;
    left: 22px;
    z-index: 2;
  }
  .DateInput_fangShape {
    fill: #fff;
  }
  .DateInput_fangStroke {
    stroke: #dbdbdb;
    fill: transparent;
  }
  .DateRangePickerInput {
    background-color: #fff;
    display: inline-block;
  }
  .DateRangePickerInput__disabled {
    background: #f2f2f2;
  }
  .DateRangePickerInput__withBorder {
    /* border-radius: 3px; */
    border: none;
    background-color: #fff;
  }
  .DateRangePickerInput__rtl {
    direction: rtl;
  }
  .DateRangePickerInput__block {
    display: block;
  }

  .DateRangePickerInput_arrow {
    display: inline-block;
    background-color: #fff;
  }
  .DateRangePickerInput_arrow_svg {
    position: absolute;
    left: 110px;
    top: 10px;
    fill: rgb(52, 58, 64);
    height: 22px;
    width: 22px;
  }
  .DateRangePickerInput_clearDates {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    padding: 10px;
    margin: 0 10px 0 5px;
    position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .DateRangePickerInput_clearDates_default:focus,
  .DateRangePickerInput_clearDates_default:hover {
    background: #fff;
    border-radius: 50%;
  }
  .DateRangePickerInput_clearDates__hide {
    visibility: hidden;
  }
  .DateRangePickerInput_clearDates_svg {
    fill: rgb(52, 58, 64);
    height: 12px;
    width: 15px;
    top: 3px;
    left: 25px;
    position: absolute;
    vertical-align: middle;
  }
  .DateRangePickerInput_clearDates_svg__small {
    height: 9px;
  }
  .DateRangePickerInput_calendarIcon {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    margin: 0 5px 0 10px;
  }
  .DateRangePickerInput_calendarIcon_svg {
    fill: #82888a;
    height: 15px;
    width: 14px;
    vertical-align: middle;
  }
  .DateRangePicker {
    position: relative;
    display: inline-block;
    background-color: rgb(245, 246, 247);
  }
  .DateRangePicker__block {
    display: block;
  }
  .DateRangePicker_picker {
    z-index: 99;
    background-color: #fff;
    position: absolute;
  }
  .DateRangePicker_picker__rtl {
    direction: rtl;
  }
  .DateRangePicker_picker__directionLeft {
    left: 0;
  }
  .DateRangePicker_picker__directionRight {
    right: 0;
  }
  .DateRangePicker_picker__portal {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .DateRangePicker_picker__fullScreenPortal {
    background-color: #fff;
  }
  .DateRangePicker_closeButton {
    background: 0 0;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 10;
    padding: 15px;
    z-index: 2;
  }

  .DateRangePicker_closeButton_svg {
    height: 15px;
    width: 15px;
    fill: #fb0552;
  }
`;
