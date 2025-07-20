import CustomInputSelect, {
	type CustomInputValue,
} from '@/shared/ui/custom/CustomInputSelect.tsx';

interface IInputHomeServerProps {
	defaultHomeServer: string;
	options?: string[];
	onChange: (event: CustomInputValue) => void;
}
export const InputHomeServer = ({
	defaultHomeServer,
	onChange,
	options,
}: IInputHomeServerProps) => {
	return (
		<CustomInputSelect
			id="homeserver"
			defaultValue={{ type: 'select', value: defaultHomeServer }}
			onChange={onChange}
			options={options}
			side={'bottom'}
			align={'end'}
		/>
	);
};

export default InputHomeServer;
