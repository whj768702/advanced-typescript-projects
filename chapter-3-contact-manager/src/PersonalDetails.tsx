import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { IPersonState, IProps, PersonRecord } from './Types';
import FormValidation from './FormValidation';
import { Database } from './Database/Database';
import { PersonalDetailsTableBuilder } from './PersonalDetailsTableBuilder';
import { RecordState } from './RecordSate';

export default class PersonalDetails extends React.Component<IProps, IPersonState> {
  private defaultState: Readonly<IPersonState>;
  private canSave: boolean = false;
  private readonly dataLayer: Database<PersonRecord>;
  private people: IPersonState[] = new Array<PersonRecord>();

  constructor(props: IProps) {
    super(props);
    this.defaultState = props.DefaultState;
    this.state = props.DefaultState;

    const tableBuilder: PersonalDetailsTableBuilder = new PersonalDetailsTableBuilder();
    this.dataLayer = new Database<PersonRecord>(tableBuilder.Build());
  }

  private updateBinding = (event: any) => {
    switch (event.target.id) {
      case 'firstName': {
        this.setState({ FirstName: event.target.value });
        break;
      }
      case 'lastName': {
        this.setState({ LastName: event.target.value });
        break;
      }
      case 'addr1': {
        this.setState({ Address1: event.target.value });
        break;
      }
      case 'addr2': {
        this.setState({ Address2: event.target.value });
        break;
      }
      case 'town': {
        this.setState({ Town: event.target.value });
        break;
      }
      case 'county': {
        this.setState({ County: event.target.value });
        break;
      }
      case 'phoneNumber': {
        this.setState({ PhoneNumber: event.target.value });
        break;
      }
      case 'postcode': {
        this.setState({ Postcode: event.target.value });
        break;
      }
      case 'dateOfBirth': {
        this.setState({ DateOfBirth: event.target.value });
        break;
      }
    }
  };

  private userCanSave = (hasError: boolean) => {
    this.canSave = hasError;
  };

  private loadPeople = () => {
    this.people = [];
    this.dataLayer.Read().then((people) => {
      this.people = people;
      this.setState(this.state);
    });
  };

  private setActive = (event: any) => {
    const person = event.target.value;
    const state = this.people.find((item) => {
      return item.PersonId === person;
    });
    if (state) {
      this.setState(state);
    }
  };

  private delete = (event: any) => {
    const person = event.target.value;
    this.DeletePerson(person);
  };

  private async DeletePerson(person: string) {
    const foundPerson = this.people.find((item) => {
      return item.PersonId === person;
    });
    if (!foundPerson) {
      return;
    }
    const personState = new RecordState();
    personState.IsActive = false;
    const state = { ...foundPerson, ...personState };
    await this.dataLayer.Update(state);
    this.loadPeople();
    this.clear();
  }

  private clear = () => {
    this.setState(this.defaultState);
  };

  private savePerson = () => {
    if (!this.canSave) {
      alert('Please correct the errors before saving');
      return;
    }
    const personState = new RecordState();
    personState.IsActive = true;
    const state = { ...this.state, ...personState };
    if (state.PersonId === '') {
      state.PersonId = Date.now().toString();
      this.dataLayer.Create(state);
      this.loadPeople();
      this.clear();
    } else {
      this.dataLayer.Update(state).then((_) => this.loadPeople());
    }
  };

  render(): React.ReactNode {
    let people = null;
    if (this.people) {
      const copyThis = this;
      people = this.people.map((p) => {
        return (
          <Row key={p.PersonId}>
            <Col lg="6">
              <label>
                {p.FirstName} {p.LastName}
              </label>
            </Col>
            <Col lg="3">
              <Button value={p.PersonId} color="link" onClick={copyThis.setActive}>
                Edit
              </Button>
            </Col>
            <Col lg="3">
              <Button value={p.PersonId} color="link" onClick={copyThis.delete}>
                Delete
              </Button>
            </Col>
          </Row>
        );
      }, this);
    }
    return (
      <Row className="mt-4 border p-2">
        <Col lg="8">
          <Row>
            <Col>
              <h4 className="mb-3">Personal details</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="firstName">First name</label>
            </Col>
            <Col>
              <label htmlFor="lastName">Last Name</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="First name"
                value={this.state.FirstName}
                onChange={this.updateBinding}
              />
            </Col>
            <Col>
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Last name"
                value={this.state.LastName}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <label htmlFor="addr1">Address line 1</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="text"
                id="addr1"
                className="form-control"
                placeholder="Address line 1"
                value={this.state.Address1}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <label htmlFor="addr2">Address line 2</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="text"
                id="addr2"
                className="form-control"
                placeholder="Address line 2"
                value={this.state.Address2}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <label htmlFor="addr2">Town</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="text"
                id="town"
                className="form-control"
                placeholder="Town"
                value={this.state.Town}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <label htmlFor="county">County</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="text"
                id="county"
                className="form-control"
                placeholder="County"
                value={this.state.County}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg="3">
              <label htmlFor="postcode">Postal/ZipCode</label>
            </Col>
            <Col lg="4">
              <label htmlFor="phoneNumber">Phone Number</label>
            </Col>
          </Row>
          <Row>
            <Col lg="3">
              <input
                type="text"
                id="postcode"
                className="form-control"
                value={this.state.Postcode}
                onChange={this.updateBinding}
              />
            </Col>
            <Col lg="4">
              <input
                type="text"
                id="phoneNumber"
                className="form-control"
                value={this.state.PhoneNumber}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <label htmlFor="dateOfBirth">Date of birth</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="date"
                id="dateOfBirth"
                className="form-control"
                value={this.state.DateOfBirth!}
                onChange={this.updateBinding}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <FormValidation CurrentState={this.state} CanSave={this.userCanSave}></FormValidation>
          </Row>
          <Col>
            <Col>
              <Row className="mt-2">
                <Col>{people}</Col>
              </Row>
              <Row>
                <Col lg="6">
                  <Button size="sm" color="success" onClick={this.loadPeople}>
                    Load
                  </Button>
                </Col>
                <Col lg="6">
                  <Button size="sm" color="info" onClick={this.savePerson}>
                    New Person
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}
