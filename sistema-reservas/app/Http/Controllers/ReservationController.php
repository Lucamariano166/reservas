<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'user_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existingReservation = Reservation::where('room_id', $request->room_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time]);
            })
            ->exists();

        if ($existingReservation) {
            return response()->json(['error' => 'Sala já reservada nesse horário.'], 409);
        }

        $reservation = Reservation::create($request->all());

        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);
        return response()->json($reservation);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'room_id' => 'sometimes|required|exists:rooms,id',
            'start_time' => 'sometimes|required|date|after:now',
            'end_time' => 'sometimes|required|date|after:start_time',
            'user_name' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existingReservation = Reservation::where('room_id', $request->room_id ?? $reservation->room_id)
            ->where(function ($query) use ($request, $reservation) {
                $query->whereBetween('start_time', [$request->start_time ?? $reservation->start_time, $request->end_time ?? $reservation->end_time])
                      ->orWhereBetween('end_time', [$request->start_time ?? $reservation->start_time, $request->end_time ?? $reservation->end_time]);
            })
            ->where('id', '<>', $reservation->id)
            ->exists();

        if ($existingReservation) {
            return response()->json(['error' => 'Sala já reservada nesse horário.'], 409);
        }

        $reservation->update($request->all());

        return response()->json($reservation);
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(null, 204);
    }
}
