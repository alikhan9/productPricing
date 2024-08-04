import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Guest from '@/Layouts/GuestLayout';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: '',
    });

    const [previewUrl, setPreviewUrl] = useState('');
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        // Create a local URL for the file
        let localUrl = URL.createObjectURL(img);
        // Update the state with the new file and the local URL for preview
        setData(prevState => ({
          ...prevState,
          avatar: img
        }));
        setPreviewUrl(localUrl);
      }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className='h-full'>
            <Head title="Register" />

            <div className='h-full w-full flex justify-center items-center'>
                <form onSubmit={submit} className='md:w-[600px] w-full px-4 md:px-0'>
                    <div>
                        <InputLabel htmlFor="name" value="Nom" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirmer mot de passe" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="avatar">Avatar</InputLabel>
                        <TextInput
                            id="avatar"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={handleImageChange}
                            required
                            capture
                        />
                        <InputError message={errors.avatar} className="mt-2" />
                        {previewUrl && (
                            <img className='max-w-[200px] max-h-[200px]' src={previewUrl} alt="Preview" />
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Déjà un compte?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Valider
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

Register.layout = page => <Guest children={page} title="Login" />