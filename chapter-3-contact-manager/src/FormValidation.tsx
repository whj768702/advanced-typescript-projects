import React from 'react';
import { Col, Row } from 'reactstrap';
import { IPersonState } from './Types';
import { AddressValidation } from './Validation/AddressValidation';
import { IValidation } from './Validation/IValidation';
import { PersonValidation } from './Validation/PersonValidation';
import { PhoneValidation } from './Validation/PhoneValidation';

interface IValidationProps {
  CurrentState: IPersonState;
  CanSave: (canSave: boolean) => void;
}

export default class FormValidation extends React.Component<IValidationProps, {}> {
  private failures = new Array<string>();
  private validation: IValidation[];

  constructor(props: IValidationProps) {
    super(props);
    this.validation = new Array<IValidation>();
    this.validation.push(new PersonValidation());
    this.validation.push(new AddressValidation());
    this.validation.push(new PhoneValidation());
  }

  private Validate() {
    this.failures = []; // 每次验证前清空老的验证状态
    this.validation.forEach((validation) => {
      validation.Validate(this.props.CurrentState, this.failures);
    });

    this.props.CanSave(this.failures.length === 0);
  }

  render() {
    this.Validate();
    const errors = this.failures.map((failure) => {
      return (
        <Row key={failure}>
          <Col>
            <label className="text-danger text-opacity-75">{failure}</label>
          </Col>
        </Row>
      );
    });
    return (
      <>
        <h3 className="text-danger">Errors</h3>
        <Col>{errors}</Col>;
      </>
    );
  }
}
