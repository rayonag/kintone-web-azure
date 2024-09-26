import { REST_SavedOnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import React, { FC } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Line, Svg, Image } from '@react-pdf/renderer';
import { applicationFormPageStyle } from '../ViewApplicationForm';
import { REST_SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm';

type Page1Props = {
    record: any; //REST_SavedVolunteerApplicationForm;
};
const Page1: FC<Page1Props> = ({ record }) => {
    return (
        <Page style={applicationFormPageStyle.page} size="A4">
            {/* <Svg height="210" width="1000">
                <Line x1="0" y1="0" x2="1000" y2="0" strokeWidth={2} stroke="rgb(255,0,0)" />
                <Image src="/images/Bridges logo.jpg" style={applicationFormPageStyle.underline} />
            </Svg> */}
            <View>
                <Text style={applicationFormPageStyle.header}>VOLUNTEER APPLICATION FORM</Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>1. PERSONAL INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>
                    Full name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>
                        {record['firstName'].value}
                        {'  '}
                        {record['middleName'].value && record['middleName'].value + '  '}
                        {record['lastName'].value}
                    </Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Permanent street/PO Box address:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['street'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['city'].value}</Text>
                    {'  '}
                    Zip/postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['zip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['state'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['country'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['phone'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['email'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Passport #:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['passportNumber'].value}</Text>
                    {'  '}
                    SSN/ID #:(if applicable){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['ssnNumber'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Passport expiration: (Day/Month/Year){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['passportExpiration'].value}</Text>
                    {'  '}
                    Issuing country{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['passportIssued'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Age: {'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['age'].value}</Text>
                    {'  '}
                    Date of birth: (Day/Month/Year){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['birthday'].value}</Text>
                    {'  '}
                    Sex:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['sex'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Full name of spouse (if applicable):{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['spouseFullName'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Full names of children (if applicable). Include ages and if they will be accompanying you to Israel:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['childrenNames'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Do you have the full support of your family in this endeavor?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasFamilySupport'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Please explain:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasFamilySupportExplain'].value}</Text>
                </Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>2. HEALTH INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Please provide a completed health questionnaire for each dependent accompanying you.</Text>
                <Text style={applicationFormPageStyle.row}>
                    Condition of your health:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['healthCondition'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Have you had any serious illness or injury?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['seriousInjury'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    If so, briefly give the date, nature and extent:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['seriousInjuryExplain'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Do you have a physical handicap?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasHandicap'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    If yes, please describe briefly:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['hasHandicapExplain'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Do you smoke?{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['doSmoke'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Can you lift 33 lbs (15kg)? (required for certain positions){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['canLift33lbs'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Personal doctor:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['personalDoctor'].value}</Text>
                    {'  '}
                    Doctor's Phone #{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['personalDoctorPhone'].value}</Text>
                </Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>3. EMERGENCY CONTACT INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Emergency Contact: </Text>
                <Text style={applicationFormPageStyle.row}>
                    Name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyName'].value}</Text>
                    {'  '}
                    Relationship:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyRelationship'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    PO Box/street:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyStreet'].value}</Text>
                    {'  '}
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCity'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyState'].value}</Text>
                    {'  '}
                    Zip/Postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyZip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell Phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyPhone'].value}</Text>
                    {'  '}
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCountry'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyEmail'].value}</Text>
                </Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>4. SERVICE WITH BRIDGESF FOR PEACE</Text>
                <Text style={applicationFormPageStyle.row}>
                    Briefly describe your purpose and motivation in applying to become a BFP volunteer in Israel:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['describeMotivation'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    In which area would you like to service in BFP:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['areaInterested'].value.join(', ')}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    What other area would you like to serve in? (If "other" selected){'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['otherAreaInterested'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Minimum availability:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['minAvailability'].value}</Text>
                    {'  '}
                    Maximum availability:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['maxAvailability'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Preferred start date(s): (Day/Month/Year) Option 1:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['preferredStartDate'].value}</Text>
                    {'  '}
                    Option 2:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['preferredStartDate2'].value}</Text>
                </Text>
            </View>
            {/* <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>3. EMERGENCY CONTACT INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Emergency Contact: </Text>
                <Text style={applicationFormPageStyle.row}>
                    Name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyName'].value}</Text>
                    {'  '}
                    Relationship:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyRelationship'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    PO Box/street:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyStreet'].value}</Text>
                    {'  '}
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCity'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyState'].value}</Text>
                    {'  '}
                    Zip/Postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyZip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell Phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyPhone'].value}</Text>
                    {'  '}
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCountry'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyEmail'].value}</Text>
                </Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>3. EMERGENCY CONTACT INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Emergency Contact: </Text>
                <Text style={applicationFormPageStyle.row}>
                    Name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyName'].value}</Text>
                    {'  '}
                    Relationship:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyRelationship'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    PO Box/street:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyStreet'].value}</Text>
                    {'  '}
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCity'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyState'].value}</Text>
                    {'  '}
                    Zip/Postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyZip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell Phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyPhone'].value}</Text>
                    {'  '}
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCountry'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyEmail'].value}</Text>
                </Text>
            </View>
            <View style={applicationFormPageStyle.details}>
                <Text style={applicationFormPageStyle.sectionTitle}>3. EMERGENCY CONTACT INFORMATION</Text>
                <Text style={applicationFormPageStyle.row}>Emergency Contact: </Text>
                <Text style={applicationFormPageStyle.row}>
                    Name:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyName'].value}</Text>
                    {'  '}
                    Relationship:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyRelationship'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    PO Box/street:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyStreet'].value}</Text>
                    {'  '}
                    City:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCity'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    State/province:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyState'].value}</Text>
                    {'  '}
                    Zip/Postal code:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyZip'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Cell Phone:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyPhone'].value}</Text>
                    {'  '}
                    Country:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyCountry'].value}</Text>
                </Text>
                <Text style={applicationFormPageStyle.row}>
                    Email:{'  '}
                    <Text style={applicationFormPageStyle.underline}>{record['emergencyEmail'].value}</Text>
                </Text>
            </View> */}
        </Page>
    );
};

export default Page1;
