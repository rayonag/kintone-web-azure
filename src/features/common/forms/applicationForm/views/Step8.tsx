import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { Character1, Character2, Character3, Character4 } from '../enums';
import Checkbox from '../../components/Checkbox';

type Step8Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
    control: Control<ApplicationFormType>;
};
const Step8: FC<Step8Props> = ({ register, errors, getValues, t, control }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.8')} />
                <div className="font-semibold mt-2 text-black">{t('characterDescription')}</div>
                <Row>
                    <Checkbox
                        label={null}
                        name={'characters.character1'}
                        control={control}
                        options={Character1(t)}
                        error={errors.character1 || undefined}
                    />
                    <Checkbox
                        label={null}
                        name={'characters.character2'}
                        control={control}
                        options={Character2(t)}
                        error={errors.character2 || undefined}
                    />
                </Row>
                <Row>
                    <Checkbox
                        label={null}
                        name={'characters.character3'}
                        control={control}
                        options={Character3(t)}
                        error={errors.character3 || undefined}
                    />
                    <Checkbox
                        label={null}
                        name={'characters.character4'}
                        control={control}
                        options={Character4(t)}
                        error={errors.characters || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step8;
