import { useNavigate } from '@tanstack/react-router';
import type { LoginResponse } from 'matrix-js-sdk/lib/@types/auth';
import {
	ConnectionError,
	MatrixError,
} from 'matrix-js-sdk/lib/http-api/errors';
import { memo, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useClient } from '@/shared/matrix-sdk';
import { setSession } from '@/shared/matrix-sdk/lib/action/setSession.ts';
import { Button } from '@/shared/ui/button.tsx';
import { Input } from '@/shared/ui/input.tsx';
import { Label } from '@/shared/ui/label.tsx';

interface IForm {
	username: string;
	password: string;
}

export const PasswordVariant = memo(({ on }: { on: boolean }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitted },
	} = useForm<IForm>();
	const { client } = useClient();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<IForm> = (data) => {
		if (client) {
			const val_username = data.username.trim();
			if (val_username) {
				client
					.login('m.login.password', {
						user: data.username,
						password: data.password,
					})
					.then((loginResponse: LoginResponse) => {
						setSession({
							baseUrl: client.baseUrl,
							deviceId: loginResponse.device_id,
							userId: loginResponse.user_id,
							accessToken: loginResponse.access_token,
							refreshToken: loginResponse.refresh_token,
						});
						navigate({ to: '/' }).then(() => {
							toast.success('Success login');
						});
					})
					.catch((err) => {
						if (err instanceof ConnectionError) {
							setError('root', {
								type: 'manual',
								message: 'Network Error',
							});
						} else if (err instanceof MatrixError) {
							if (err.name === 'M_FORBIDDEN') {
								setError('root', {
									type: 'manual',
									message: 'Password or Username incorrect',
								});
							} else if (err.name === 'M_LIMIT_EXCEEDED') {
								setError('root', {
									type: 'manual',
									message: 'To many requests',
								});
							} else {
								setError('root', {
									type: 'manual',
									message: 'Unknown Error',
								});
							}
						} else {
							setError('root', {
								type: 'manual',
								message: err.message,
							});
						}
					});
			} else {
				toast.warning('Empty username');
			}
		}
	};

	useEffect(() => {
		if (errors.root?.message && isSubmitted) {
			toast.error(errors.root.message);
		}
	}, [errors.root, isSubmitted]);
	useEffect(() => {
		if (errors.username?.message && isSubmitted) {
			toast.warning(errors.username.message);
		}
	}, [errors.username, isSubmitted]);
	useEffect(() => {
		if (errors.password?.message && isSubmitted) {
			toast.warning(errors.password.message);
		}
	}, [errors.password, isSubmitted]);

	if (!on) {
		return null;
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={`grid gap-5 mt-4`}>
			<div className="grid gap-3">
				<Label htmlFor="username">Username</Label>
				<Input
					required
					{...register('username', { required: 'Username is required field' })}
					id="username"
					defaultValue=""
				/>
			</div>
			<div className="grid gap-3">
				<Label aria-required htmlFor="password">
					Password
				</Label>
				<Input
					required
					{...register('password', { required: 'Password is required field' })}
					id="password"
					type={'password'}
					defaultValue=""
				/>
			</div>
			<Button type="submit" className="mt-4 cursor-pointer" variant="outline">
				Login
			</Button>
		</form>
	);
});
