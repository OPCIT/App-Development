import * as React from 'react';
import { Text, TextInput, ScrollView, View, Button, Alert, Image, DatePickerAndroid } from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment';
import { createStackNavigator } from 'react-navigation';

const Form = t.form.Form;

var Reasons = t.enums({
  'Sick': 'Sick',
  'Holidays': 'Holidays',
  'Other': 'Other',
});

var YesNo = t.enums({
  'Yes': 'Yes',
  'No': 'No',
});

var Leaders = t.enums({
  'brett.norton@opc.com.au': 'Brett Norton',
  'cathy.norton@opc.com.au': 'Cathy Norton',
  'clinton.henderson@opc.com.au,tim.bowman@opc.com.au': 'Clinton Henderson',
  'michael.goss@opc.com.au': 'Michael Goss',
});

var Teams = t.enums({
  'Management': 'Management',
  'Administration': 'Administration',
  'Managed Information Services': 'IT Services',
  'Sales': 'Sales',
  'Web Application Development Services': 'Web Services',
});

const Leave = t.struct({
  name: t.String,
  email: t.String,
  reason: Reasons,
  other: t.maybe(t.String),
  description: t.String,
  medical: t.maybe(YesNo),
  first: t.struct({
    firstDate: t.Date,
    firstTime: t.maybe(t.Date),
  }),
  last: t.struct({
    lastDate: t.Date,
    lastTime: t.maybe(t.Date),
  }),
  total: t.maybe(t.Number),
  leader: Leaders,
  team: Teams,
});

const LeaveOptions = {
  fields: {
    name: {
      label: 'Team member name',
    },
    email: {
      label: 'Email address',
    },
    reason: {
      label: 'Reason for leave',
    },
    other: {
      label: 'Other, please specify',
    },
    description: {
      label: 'Leave Description',
      help: 'If private/personal please indicate accordingly.',
      multiline: true,
      numberOfLines: 3,
    },
    medical: {
      label: 'Medical Certificate',
      help: 'Medical Certificate required for sick leave taken on Mon, Fri or for longer than two consecutive days.',
    },
    first: {
      label: 'First day of leave',
      fields: {
        firstDate: {
          label: 'Date',
          mode: 'date',
          config: {
            format: (date) => moment(date).format('DD/MM/YYYY'),
          },
        },
        firstTime: {
          label: 'Time',
          mode: 'time',
          config: {
            format: (date) => moment(date).format('HH:mm A'),
          },
        },
      },
    },
    last: {
      label: 'Last day of leave',
      fields: {
        lastDate: {
          label: 'Date',
          mode: 'date',
          config: {
            format: (date) => moment(date).format('DD/MM/YYYY'),
          },
        },
        lastTime: {
          label: 'Time',
          mode: 'time',
          config: {
            format: (date) => moment(date).format('HH:mm A'),
          },
        },
      },
    },
    total: {
      label: 'Total number of work days absent',
    },
    leader: {
      label: 'Authorising Team Leader/Manager',
    },
    team: {
      label: 'Team',
    },
  },
};

export default class LeaveFormScreen extends React.Component {

  static navigationOptions = {
    title: 'Leave Form',
  };

submitForApproval = () => {

    const { navigation } = this.props;
    const oauth = navigation.getParam('oauth_token', 'none');
    const value = this._form.getValue();
    
    return fetch('http://intranet.opcit.net.au/api/submission', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + oauth,
      },
      body: JSON.stringify({
        'webform': '67307380-322b-4998-b692-8868a23adb06',
        'submission[data][1][values][0]':  (value.name) ? value.name : '', /*Team Member Name*/
        'submission[data][13][values][0]': (value.email) ? value.email : '', /*Team Member Email*/
        'submission[data][2][values][0]':  (value.reason) ? value.reason : '', /*Reason for Leave*/
        'submission[data][3][values][0]':  (value.other) ? value.other : '', /*Other, please specify*/
        'submission[data][10][values][0]': (value.description) ? value.description : '', /*Leave Description*/
        'submission[data][4][values][0]':  (value.medical) ? value.medical : '', /*Medical Certificate*/
        'submission[data][5][values][0]':  (value.first.firstDate) ? moment(value.first.firstDate).format('YYYY-MM-DD') : '', /*First day of leave*/
        'submission[data][11][values][0]': (value.first.firstTime) ? moment(value.first.firstTime).format('HH:mm:ss') : '', /*First day of leave time*/
        'submission[data][6][values][0]':  (value.last.lastDate) ? moment(value.last.lastDate).format('YYYY-MM-DD') : '', /*Last day of leave*/
        'submission[data][12][values][0]': (value.last.lastTime) ? moment(value.last.lastTime).format('HH:mm:ss') : '', /*Last day of leave time*/
        'submission[data][8][values][0]':  (value.total) ? value.total : '', /*Total number of work days absent*/
        'submission[data][7][values][0]':  (value.leader) ? value.leader : '', /*Authorising Team Leader/Manager*/
        'submission[data][9][values][0]':  (value.team) ? value.team : '', /*Team*/
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_description) {

          /* If we get an error description returned, something went wrong, so error */
          Alert.alert('Error: ' + responseJson.error_description);
        } else {

          /* Otherwise everything worked, so update the states and Alert us */
          Alert.alert(JSON.stringify(responseJson));
        }
      })
      .catch(error => {
        /* This is if the Fetch itself failed I think.... */
        Alert.alert('Error: ' + error);
      });
  }

  render() {

    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}>
          <Form
            ref={c => this._form = c}
            type={Leave}
            options={LeaveOptions}
          />
          <Button
            title="Submit for Approval"
            onPress={this.submitForApproval}
          />
        </View>
      </ScrollView>
    );
  }
}