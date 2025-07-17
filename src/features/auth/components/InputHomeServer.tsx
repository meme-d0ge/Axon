import { useEffect, useState } from 'react';
import CustomInputSelect from '@/shared/ui/custom/CustomInputSelect.tsx';

interface IInputHomeServerProps {
	defaultHomeServer: string;
	setValue: (value: string) => void;
	options?: string[];
}
export const InputHomeServer = ({
	defaultHomeServer,
	setValue,
	options,
}: IInputHomeServerProps) => {
	const [homeServer, setHomeServer] = useState<string>(defaultHomeServer);

	useEffect(() => {
		setValue(homeServer);
	}, [homeServer, setValue]);

	return (
		<CustomInputSelect
			id="homeserver"
			value={homeServer}
			setValue={(value) => {
				setHomeServer(value);
			}}
			options={options}
			side={'bottom'}
			aligh={'end'}
		/>
	);
};

export default InputHomeServer;
