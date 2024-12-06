<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'As credenciais inseridas não correspondem a nossos registros!'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // $cookie = cookie('token', $token, 60 * 24); // 1 day

        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token
        ]);
        // ->withCookie($cookie);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        // $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ]);
        //->withCookie($cookie);
    }

    public function user(Request $request) {
        return new UserResource($request->user());
    }
}
