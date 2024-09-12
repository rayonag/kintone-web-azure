import React, { FC, ReactElement, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Verify from '../../components/Verify';
import { DoctrinalStatement, EvangelismStatement, MessianicJudaismStatement, MissionStatement } from '@/pages/apply/form/FirstTimeTips';
import ReactModal from 'react-modal';
import Input from '../../components/Input';
import Date from '../../components/Date';
import Row from '../../components/Row';

type Step10Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
};
const Step10: FC<Step10Props> = ({ register, errors, getValues, t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [document, setDocument] = useState('');
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.10')} />
                <Verify label={t('verify1')} register={register('verify1')} error={errors.verify1} />
                <Verify label={t('verify2')} register={register('verify2')} error={errors.verify2} />
                <Verify label={t('verify3')} register={register('verify3')} error={errors.verify3} />
                <Verify label={t('verify4')} register={register('verify4')} error={errors.verify4} />
                <Verify label={t('verify5.title')} register={register('verify5')} error={errors.verify5} />
                <ul className="text-black mb-3" onClick={() => setIsModalOpen(true)}>
                    <li className="hover:text-blue-700 cursor-pointer" onClick={() => setDocument('doctrinalStatement')}>
                        ◇ {t('verify5.options.1')}
                    </li>
                    <li className="hover:text-blue-700 cursor-pointer" onClick={() => setDocument('missionStatement')}>
                        ◇ {t('verify5.options.2')}
                    </li>
                    <li>◇ {t('verify5.options.3')}</li>
                    <li className="hover:text-blue-700 cursor-pointer" onClick={() => setDocument('evangelismStatement')}>
                        ◇ {t('verify5.options.4')}
                    </li>
                    <li className="hover:text-blue-700 cursor-pointer" onClick={() => setDocument('messianicJudaismStatement')}>
                        ◇ {t('verify5.options.5')}
                    </li>
                </ul>
                <DocumentsModal document={document} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <Verify label={t('verify6')} register={register('verify6')} error={errors.verify6} />
                <Verify label={t('verify7')} register={register('verify7')} error={errors.verify7} />
            </section>
            <section>
                <Row>
                    <Input label={t('signature')} register={register('signature')} error={errors.signature} />
                    <Date label={t('signatureDate')} register={register('signatureDate')} error={errors.signatureDate} />
                </Row>
            </section>
        </div>
    );
};

export default Step10;

interface DocumentsModalProps {
    document: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DocumentsModal: React.FC<DocumentsModalProps> = ({ document, isModalOpen, setIsModalOpen }) => {
    const modalStyle = {
        content: {
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            maxWidth: '5000px',
            width: '80%',
            maxHeight: '80%',
            color: 'black'
        }
    };

    const documents: { [key in string]: ReactElement } = {
        doctrinalStatement: <DoctrinalStatement />,
        missionStatement: <MissionStatement />,
        goal: <></>,
        evangelismStatement: <EvangelismStatement />,
        messianicJudaismStatement: <MessianicJudaismStatement />
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>What should I do next?</button>
            <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle}>
                <div>
                    <label htmlFor="name">
                        <span className="text-xl"></span> {documents[document]}
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="btn" onClick={() => setIsModalOpen(false)}>
                        Close
                    </button>
                </div>
            </ReactModal>
        </>
    );
};
