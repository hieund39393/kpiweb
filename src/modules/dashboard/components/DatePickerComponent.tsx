import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

interface DatePickerComponentProps {
  defaultValue: Moment | null;
  format: string;
  form: any; // Replace 'any' with the type of your form library
  formKey: string;
  picker?: 'date' | 'month' | 'quarter' | 'year';
  notClear?: boolean;
  disabledDate?: (currentDate: Moment | null) => boolean;
  inputReadOnly?: boolean;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const {
    defaultValue,
    format,
    form,
    formKey,
    picker,
    notClear,
    disabledDate,
    inputReadOnly = false,
  } = props;

  const [defaultDate, setDefaultDate] = useState<Moment | null>(defaultValue);

  // get default date
  useEffect(() => {
    let convert: string | null = '';
    if (defaultValue === null) {
      convert = null;
    } else convert = moment(defaultValue).format(format);

    form.setFieldsValue({
      [formKey]: convert,
    });
    setDefaultDate(convert ? moment(convert) : null);
  }, [defaultValue, form, formKey, format]);

  // change date
  const handleChange = useCallback(
    (date: Moment | null, dateString: string) => {
      let convert: Moment | null = null;
      if (date !== null) {
        if (picker === 'quarter') {
          convert = moment(dateString.split('-')[0])
            .quarter(parseInt(dateString.split('-')[1][1]))
            .startOf('quarter');
        } else {
          convert = moment(date);
        }
      }

      form.setFieldsValue({
        [formKey]: convert ? convert.format(format) : null,
      });
      setDefaultDate(convert);
    },
    [form, formKey, format, picker]
  );

  // type format date
  const renderFormatDate = useCallback(() => {
    switch (picker) {
      case 'month':
        return 'MM/YYYY';
      case 'year':
        return 'YYYY';
      case 'quarter':
        return 'YYYY-\\QQ';
      default:
        return 'DD/MM/YYYY';
    }
  }, [picker]);

  return (
    <DatePicker
      locale={locale}
      format={renderFormatDate()}
      allowClear={notClear ? false : true}
      onChange={handleChange}
      picker={picker}
      value={(form && form.getFieldValue(formKey) && moment(form.getFieldValue(formKey))) || null}
      disabledDate={disabledDate}
      disabled={inputReadOnly}
    />
  );
};

export default React.memo(DatePickerComponent);
